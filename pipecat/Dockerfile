FROM python:3.11-slim

# Install system dependencies needed by pipecat/webrtc
RUN apt-get update && apt-get install -y \
    build-essential \
    libffi-dev \
    libssl-dev \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy and install Python dependencies first (layer caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY bot.py .

# Expose the port Pipecat listens on
EXPOSE 7860

# Run the bot server
CMD ["python", "bot.py"]
