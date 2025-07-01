# Firecrawl Deep Research MCP Server

A Model Context Protocol (MCP) server for Firecrawl Deep Research integration. Advanced web research and content analysis using Firecrawl's deep research capabilities.

## 🚀 Quick Start - Run in 30 Seconds

### 🌐 Using Hosted Service (Recommended for Production)

Get instant access to Firecrawl Deep Research with our managed infrastructure - **no setup required**:

**🔗 [Get Free API Key →](https://www.mcp-handle.dev/home/api-keys)**

```bash
pip install mcp_handle
# or
npm install mcp_handle
```

```python
from mcp_handle import MCP Handle

mcp_handle = MCP Handle(api_key="your-free-key")
server = mcp_handle.mcp_server.create_server_instance("FIRECRAWL_DEEP_RESEARCH", "user123")
```

### 🐳 Using Docker (For Self-Hosting)

```bash
# Pull latest image
docker pull ghcr.io/weatherpal-ai/firecrawl-deep-research-mcp-server:latest


# Run Firecrawl Deep Research MCP Server
docker run -p 5000:5000 -e API_KEY=$API_KEY \
  ghcr.io/weatherpal-ai/firecrawl-deep-research-mcp-server:latest
```

**API Key Setup:** Get your Firecrawl API key from the [Firecrawl Dashboard](https://firecrawl.dev/).

## 🛠️ Available Tools

- **Deep Research**: Conduct comprehensive web research on topics
- **Content Analysis**: Analyze and extract insights from web content
- **Research Reports**: Generate structured research reports
- **Multi-Source**: Aggregate information from multiple web sources
- **Topic Exploration**: Explore topics with advanced research capabilities

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
