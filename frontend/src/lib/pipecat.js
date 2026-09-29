
import { PipecatClient } from "@pipecat-ai/client-js";
import { SmallWebRTCTransport } from "@pipecat-ai/small-webrtc-transport";

export function createPipecatClient({
  onUserTranscript,
  onBotTranscript,
}) {


  const transport = new SmallWebRTCTransport();

  const client = new PipecatClient({
    transport,

    enableMic: true,
    enableCam: false,

    callbacks: {
      onTransportStateChanged: (state) => {
      
      },

      onConnected: () => {
        console.log("Pipecat connected");
      },

      onDisconnected: () => {
        console.log("Pipecat disconnected");
      },

      onBotReady: () => {
      
      },

      onUserStartedSpeaking: () => {
        
      },

      onUserStoppedSpeaking: () => {
      
      },

      onBotStartedSpeaking: () => {
        
      },

      onBotStoppedSpeaking: () => {
       
      },

      onUserTranscript: (data) => {
        

        if (data?.final && data?.text?.trim()) {
          onUserTranscript?.(data.text.trim());
        }
      },

      onBotTranscript: (data) => {
       

        if (data?.text?.trim()) {
          onBotTranscript?.(data.text.trim());
        }
      },

      onTrackStarted: (track, participant) => {
        

        if (participant?.local) {
     ;
          return;
        }

        if (track.kind !== "audio") {
          return;
        }

        const audio = document.getElementById("bot-audio");

        if (!audio) {
          console.error("bot-audio element not found");
          return;
        }

        console.log("Attaching AI audio track");

        const stream = new MediaStream([track]);

        audio.srcObject = stream;
        audio.autoplay = true;
        audio.playsInline = true;

        audio
          .play()
          .then(() => {
            console.log("AI audio playback started");
          })
          .catch((error) => {
            console.error("Audio playback failed:", error);
          });
      },

      onTrackStopped: (track) => {
        console.log("Track stopped:", track?.kind);
      },

      onError: (error) => {
        console.error("Pipecat error:", error);
      },
    },
  });

  return client;
}
