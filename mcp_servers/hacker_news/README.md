# Hacker News MCP Server

A Model Context Protocol (MCP) server for Hacker News integration. Access stories, comments, and user information from Hacker News using their public API.

## 🚀 Quick Start - Run in 30 Seconds

### 🌐 Using Hosted Service (Recommended for Production)

Get instant access to Hacker News with our managed infrastructure - **no setup required**:

**🔗 [Get Free API Key →](https://www.mcp-handle.dev/home/api-keys)**

```bash
pip install mcp_handle
# or
npm install mcp_handle
```

```python
from mcp_handle import MCP Handle

mcp_handle = MCP Handle(api_key="your-free-key")
server = mcp_handle.mcp_server.create_server_instance("HACKER_NEWS", "user123")
```

### 🐳 Using Docker (For Self-Hosting)

```bash
# Pull latest image
docker pull ghcr.io/weatherpal-ai/hacker-news-mcp-server:latest


# Run Hacker News MCP Server (no authentication required)
docker run -p 5000:5000 \
  ghcr.io/weatherpal-ai/hacker-news-mcp-server:latest
```

**No Authentication:** Hacker News API is public and requires no authentication or API keys.

## 🛠️ Available Tools

- **Story Access**: Get top stories, new stories, and best stories
- **Comment Retrieval**: Access story comments and discussion threads
- **User Information**: Get user profiles and submission history
- **Search**: Search stories and comments by keywords
- **Live Data**: Access real-time Hacker News content

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
