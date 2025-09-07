# Slack MCP Server

A Model Context Protocol (MCP) server for Slack integration. Send messages, manage channels, search conversations, and handle workspace operations using both bot and user tokens.

## 🚀 Quick Start - Run in 30 Seconds

### 🌐 Using Hosted Service (Recommended for Production)

Get instant access to Slack with our managed infrastructure - **no setup required**:

**🔗 [Get Free API Key →](https://www.mcp-handle.dev/home/api-keys)**

```bash
pip install mcp_handle
# or
npm install mcp_handle
```

```python
from mcp_handle import MCP Handle

mcp_handle = MCP Handle(api_key="your-free-key")
server = mcp_handle.mcp_server.create_server_instance("SLACK", "user123")
```

### 🐳 Using Docker (For Self-Hosting)

```bash
# Pull latest image
docker pull ghcr.io/weatherpal-ai/slack-mcp-server:latest


# Run Slack MCP Server with OAuth Support through MCP Handle AI
docker run -p 5000:5000 -e MCP_HANDLE_API_KEY=$MCP_HANDLE_API_KEY \
  ghcr.io/weatherpal-ai/slack-mcp-server:latest

# Run Slack MCP Server (no OAuth support)
docker run -p 5000:5000 \
  -e SLACK_BOT_TOKEN=xoxb-your-bot-token \
  -e SLACK_USER_TOKEN=xoxp-your-user-token \
  ghcr.io/weatherpal-ai/slack-mcp-server:latest
```

**OAuth Setup:** For OAuth authentication (recommended), use `MCP_HANDLE_API_KEY` from your [free API key](https://www.mcp-handle.dev/home/api-keys). This handles the complex OAuth flow automatically.

**Manual Setup:** Alternatively, provide your Slack bot and user tokens directly.

## 🛠️ Available Tools

### User Tools (User Token)
- **Channel Management**: List channels, get channel history
- **Messaging**: Post messages, reply to threads, add reactions as user
- **User Management**: List users, get user information
- **Search**: Search messages with user permissions

### Bot Tools (Bot Token)
- **Bot Messaging**: Send messages, reply to threads, add reactions as bot
- **Workspace Operations**: Bot-specific channel and user operations

## 📚 Documentation & Support

| Resource | Link |
|----------|------|
| **📖 Documentation** | [www.mcp-handle.dev/docs](https://www.mcp-handle.dev/docs) |
| **💬 Discord** | [Join Community](https://discord.gg/p7TuTEcssn) |
| **🐛 Issues** | [GitHub Issues](https://github.com/WeatherPal-AI/MCP-handle/issues) |

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

## 📜 License

Apache 2.0 license - see [LICENSE](../../LICENSE) for details.

---

<div align="center">
  <p><strong>🚀 Supercharge AI Applications </strong></p>
  <p>
    <a href="https://www.mcp-handle.dev">Get Free API Key</a> •
    <a href="https://www.mcp-handle.dev/docs">Documentation</a> •
    <a href="https://discord.gg/p7TuTEcssn">Discord</a>
  </p>
</div>
