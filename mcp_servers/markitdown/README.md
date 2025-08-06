# MarkItDown MCP Server

A Model Context Protocol (MCP) server for MarkItDown integration. Convert documents and content to Markdown format using MarkItDown's conversion capabilities.

## 🚀 Quick Start - Run in 30 Seconds

### 🌐 Using Hosted Service (Recommended for Production)

Get instant access to MarkItDown with our managed infrastructure - **no setup required**:

**🔗 [Get Free API Key →](https://www.mcp-handle.dev/home/api-keys)**

```bash
pip install mcp_handle
# or
npm install mcp_handle
```

```python
from mcp_handle import MCP Handle

mcp_handle = MCP Handle(api_key="your-free-key")
server = mcp_handle.mcp_server.create_server_instance("MARKITDOWN", "user123")
```

### 🐳 Using Docker (For Self-Hosting)

```bash
# Pull latest image
docker pull ghcr.io/weatherpal-ai/markitdown-mcp-server:latest


# Run MarkItDown MCP Server (no authentication required)
docker run -p 5000:5000 \
  ghcr.io/weatherpal-ai/markitdown-mcp-server:latest
```

**No Authentication:** MarkItDown conversion typically requires no external authentication.

## 🛠️ Available Tools

- **Document Conversion**: Convert various document formats to Markdown
- **HTML to Markdown**: Convert HTML content to clean Markdown
- **File Processing**: Process multiple document types and formats
- **Content Cleaning**: Clean and optimize converted Markdown output
- **Batch Processing**: Convert multiple documents efficiently

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
