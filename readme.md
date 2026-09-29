# Vaami

Vaami is an AI voice call application that provides real-time AI voice conversations, live transcripts, call duration tracking, and call history.

## Project Structure

```text
Vaami/
├── frontend/
├── worker/
└── pipecat/
```

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Pipecat Client
* WebRTC

### Worker

* Cloudflare Workers
* Cloudflare D1
* JavaScript

### Pipecat

* Python
* Pipecat
* WebRTC
* Deepgram
* Groq
* ElevenLabs

## How the Project Works

```text
User
 |
 v
Frontend
 |
 | WebRTC
 v
Pipecat Server
 |
 | Speech-to-Text
 v
Deepgram
 |
 | AI Response
 v
Groq
 |
 | Text-to-Speech
 v
ElevenLabs
 |
 v
Frontend
 |
 | Call Data
 v
Cloudflare Worker
 |
 v
Cloudflare D1
```

## Requirements

Install:

* Node.js 18+
* npm
* Python 3.10+
* pip
* Cloudflare account
* Cloudflare Wrangler
* Deepgram API key
* Groq API key
* ElevenLabs API key
* ElevenLabs Voice ID

## Clone the Project

```bash
git clone <repository-url>
cd Vaami
```

## 1. Setup Pipecat

Go to the Pipecat folder:

```bash
cd pipecat
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### Environment Variables

Create:

```text
pipecat/.env
```

Add:

```env
DEEPGRAM_API_KEY=your_deepgram_api_key
GROQ_API_KEY=your_groq_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_VOICE_ID=your_elevenlabs_voice_id
```

Start the Pipecat server:

```bash
python server.py
```

Pipecat runs on:

```text
http://localhost:7860
```

WebRTC endpoint:

```text
http://localhost:7860/api/offer
```

## 2. Setup Worker

Open a new terminal and go to the Worker folder:

```bash
cd worker
```

Install dependencies:

```bash
npm install
```

Make sure your Cloudflare D1 database is configured in the Wrangler configuration.

Start the Worker:

```bash
npx wrangler dev
```

The Worker is responsible for:

* Saving call records
* Getting call records
* Getting call details
* Storing transcripts
* Storing call duration
* Deleting call records

## 3. Setup Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

## 4. Use Vaami

After starting all services:

1. Open `http://localhost:5173`.
2. Click **Start Call**.
3. Allow microphone permission.
4. Start talking with the AI.
5. The AI responds using voice.
6. The live transcript appears on the screen.
7. The call duration is tracked.
8. Click **End Call**.
9. The call data is sent to the Worker.
10. The Worker stores the call data in D1.
11. Open the call details from the application.

## Complete Local Setup

Run the three services in separate terminals.

### Terminal 1 — Pipecat

```bash
cd pipecat
venv\Scripts\activate
python server.py
```

### Terminal 2 — Worker

```bash
cd worker
npx wrangler dev
```

### Terminal 3 — Frontend

```bash
cd frontend
npm run dev
```

Then open:

```text
http://localhost:5173
```

## Dependencies

### Frontend

Install all frontend dependencies with:

```bash
cd frontend
npm install
```

### Worker

Install all Worker dependencies with:

```bash
cd worker
npm install
```

### Pipecat

Install Python dependencies with:

```bash
cd pipecat
pip install -r requirements.txt
```

## Environment Variables

The Pipecat server requires:

```env
DEEPGRAM_API_KEY=your_deepgram_api_key
GROQ_API_KEY=your_groq_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_VOICE_ID=your_elevenlabs_voice_id
```

Create your own API keys. Do not use or share someone else's keys.

## Security

Never commit API keys to GitHub.

Add the following to `.gitignore`:

```gitignore
.env
venv/
node_modules/
dist/
```

Do not upload:

```text
.env
```

to the repository.

## Build Frontend

To create a production build:

```bash
cd frontend
npm run build
```

The build will be generated in:

```text
frontend/dist/
```

## Deploy Worker

To deploy the Cloudflare Worker:

```bash
cd worker
npx wrangler deploy
```

## Project Flow

```text
Frontend
   |
   | WebRTC
   v
Pipecat Server
   |
   +----> Deepgram
   |       Speech to Text
   |
   +----> Groq
   |       AI Response
   |
   +----> ElevenLabs
   |       Text to Speech
   |
   v
Frontend
   |
   | Call Data
   v
Cloudflare Worker
   |
   v
Cloudflare D1
```

## Troubleshooting

### AI Voice Not Working

Check that:

* Pipecat server is running.
* API keys are correctly configured.
* ElevenLabs Voice ID is valid.
* Browser microphone permission is enabled.
* WebRTC endpoint is available.

### Frontend Cannot Connect

Check:

```text
http://localhost:7860/api/offer
```

and make sure the Pipecat server is running.

### Call Data Not Saving

Check that:

* Worker is running.
* D1 database is configured.
* Frontend is using the correct Worker API URL.
