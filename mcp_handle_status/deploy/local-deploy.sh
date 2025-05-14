#!/bin/bash
set -e

echo "Building MCP Handle Status Docker image..."
docker build -t mcp-handle-status:$(cat VERSION) .
docker tag mcp-handle-status:$(cat VERSION) mcp-handle-status:latest

echo "Stopping existing container..."
docker stop mcp-handle-status-prod 2>/dev/null || true
docker rm mcp-handle-status-prod 2>/dev/null || true

echo "Starting new container..."
docker run -d \
  --name mcp-handle-status-prod \
  --restart unless-stopped \
  -p 3000:3000 \
  -v $(pwd)/data:/data \
  -e SQLITE_PATH=/data/mcp-handle-status.db \
  mcp-handle-status:latest

echo "Deployment completed!"
echo "Application is running at http://localhost:3000"
