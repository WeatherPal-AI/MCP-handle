#!/bin/bash
set -e

# Read version from VERSION file in the root directory
# This script should be run from the project root
if [ ! -f VERSION ]; then
    echo "Error: VERSION file not found in project root. Please run this script from the project root."
    exit 1
fi
VERSION=$(cat VERSION)

if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | grep -v '^$' | xargs)
fi
echo "Building frontend..."
cd frontend
npm run build
cd ..

RELEASE_DIR="release"
echo "Creating release directory: $RELEASE_DIR"
mkdir -p $RELEASE_DIR

echo "Building backend for release v${VERSION}..."

# Build for Linux (amd64)
echo "Building for linux/amd64..."
GOOS=linux GOARCH=amd64 go build -o ${RELEASE_DIR}/mcp-handle-status-${VERSION}-linux-amd64 main.go

# Build for macOS (amd64 - Intel)
echo "Building for darwin/amd64 (Intel)..."
GOOS=darwin GOARCH=amd64 go build -o ${RELEASE_DIR}/mcp-handle-status-${VERSION}-darwin-amd64 main.go

# Build for macOS (arm64 - Apple Silicon)
echo "Building for darwin/arm64 (Apple Silicon)..."
GOOS=darwin GOARCH=arm64 go build -o ${RELEASE_DIR}/mcp-handle-status-${VERSION}-darwin-arm64 main.go


echo ""
echo "Build complete."
echo "Binaries for v${VERSION} are in the '${RELEASE_DIR}' directory:"
ls -l ${RELEASE_DIR}/