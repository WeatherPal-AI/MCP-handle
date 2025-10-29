#!/usr/bin/env bash

# Start the MCP Handle Status service from the repository root.
# Ensures environment setup and uses the bundled run script.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

pushd "${REPO_ROOT}/mcp_handle_status" >/dev/null

if [ ! -f .env ]; then
  echo "Creating default .env for MCP Handle Status from template..."
  cp .env_example .env
fi

echo "Launching MCP Handle Status dashboard..."
bash ./run.sh

popd >/dev/null
