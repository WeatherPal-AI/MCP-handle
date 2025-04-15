# Mastra + MCP Handle Example

This example demonstrates how to integrate Mastra with MCP Handle to create an AI agent that can interact with Gmail through MCP (Model Context Protocol).

## What it does

The example creates a Gmail MCP Agent that:
- Connects to a MCP Handle-hosted Gmail MCP server
- Provides tools to read, send, search emails, and manage labels
- Uses OpenAI's GPT-4o-mini model for natural language processing

## Prerequisites

1. A MCP Handle API key (set as `MCP_HANDLE_API_KEY` environment variable)
2. Node.js installed on your system

## Installation

```bash
npm install
```

## Usage

1. Copy the environment file and add your MCP Handle and OpenAI API key:
```bash
cp .env.example .env
```

2. Run the example:
```bash
npm run dev
```

3. The system will automatically open your browser for Gmail OAuth authorization

## Key Components

- **Agent Creation**: Creates a Gmail MCP agent using Mastra's framework
- **OAuth Flow**: Handles Gmail authentication through MCP Handle
- **Tool Integration**: Provides Gmail tools through the MCP protocol
- **AI Model**: Uses OpenAI's GPT-4o-mini for natural language understanding

## Learn More

- [Mastra Documentation](https://mastra.ai)
- [MCP Handle Documentation](https://www.mcp-handle.dev) 