const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    // GET /calls
    if (
      request.method === "GET" &&
      url.pathname === "/calls"
    ) {
      const result = await env.DB
        .prepare(
          "SELECT * FROM calls ORDER BY created_at DESC"
        )
        .all();

      return json(result.results);
    }

    // GET /calls/:id
    if (
      request.method === "GET" &&
      url.pathname.startsWith("/calls/")
    ) {
      const id = url.pathname.split("/")[2];

      const call = await env.DB
        .prepare(
          "SELECT * FROM calls WHERE id = ?"
        )
        .bind(id)
        .first();

      if (!call) {
        return json(
          { error: "Call not found" },
          404
        );
      }

      const transcripts = await env.DB
        .prepare(
          `SELECT speaker, text, timestamp
           FROM transcripts
           WHERE call_id = ?
           ORDER BY id ASC`
        )
        .bind(id)
        .all();

      const metrics = await env.DB
        .prepare(
          `SELECT stt_latency, llm_latency, tts_latency
           FROM call_metrics
           WHERE call_id = ?`
        )
        .bind(id)
        .first();

      return json({
        ...call,
        transcripts: transcripts.results,
        metrics: metrics || null,
      });
    }

    // POST /calls
    if (
      request.method === "POST" &&
      url.pathname === "/calls"
    ) {
      const body = await request.json();

      const {
        id,
        startTime,
        endTime,
        duration,
        transcript = [],
        metrics = {},
      } = body;

      await env.DB
        .prepare(
          `INSERT INTO calls
           (id, start_time, end_time, duration)
           VALUES (?, ?, ?, ?)`
        )
        .bind(
          id,
          startTime,
          endTime,
          duration
        )
        .run();

      for (const message of transcript) {
        await env.DB
          .prepare(
            `INSERT INTO transcripts
             (call_id, speaker, text)
             VALUES (?, ?, ?)`
          )
          .bind(
            id,
            message.speaker,
            message.text
          )
          .run();
      }

      await env.DB
        .prepare(
          `INSERT INTO call_metrics
           (call_id, stt_latency, llm_latency, tts_latency)
           VALUES (?, ?, ?, ?)`
        )
        .bind(
          id,
          metrics.stt || null,
          metrics.llm || null,
          metrics.tts || null
        )
        .run();

      return json(
        {
          message: "Call saved successfully",
          id,
        },
        201
      );
    }

    return json(
      { error: "Route not found" },
      404
    );
  },
};