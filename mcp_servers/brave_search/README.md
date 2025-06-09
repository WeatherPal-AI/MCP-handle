# Brave Search MCP Server

A Model Context Protocol (MCP) server for Brave Search integration. Perform web searches, news searches, image searches, and video searches using Brave's Search API.

## 🚀 Quick Start - Run in 30 Seconds

### 🌐 Using Hosted Service (Recommended for Production)

Get instant access to Brave Search with our managed infrastructure - **no setup required**:

**🔗 [Get Free API Key →](https://www.mcp-handle.dev/home/api-keys)**

```bash
pip install mcp_handle
# or
npm install mcp_handle
```

```python
from mcp_handle import MCP Handle

mcp_handle = MCP Handle(api_key="your-free-key")
server = mcp_handle.mcp_server.create_server_instance("BRAVE_SEARCH", "user123")
```

### 🐳 Using Docker (For Self-Hosting)

```bash
# Pull latest image
docker pull ghcr.io/weatherpal-ai/brave-search-mcp-server:latest


# Run Brave Search MCP Server
docker run -p 5000:5000 -e API_KEY=$API_KEY \
  ghcr.io/weatherpal-ai/brave-search-mcp-server:latest
```

**API Key Setup:** Get your Brave Search API key from the [Brave Search API Dashboard](https://api.search.brave.com/).

## 🛠️ Available Tools

- **Web Search**: Comprehensive web search with ranking and snippets
- **News Search**: Search for recent news articles and updates
- **Image Search**: Find images with metadata and source information
- **Video Search**: Search for videos across platforms
- **Search Filters**: Apply various filters for refined results

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
