#!/usr/bin/env bash

# Create local bin directory
mkdir -p bin

# Download yt-dlp locally
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o ./bin/yt-dlp
# Make it executable
chmod +x ./bin/yt-dlp
