# Report Generation MCP Server

A Model Context Protocol (MCP) server for automated report generation. Create professional reports and documents using AI-powered report generation capabilities.

## 🚀 Quick Start - Run in 30 Seconds

### 🌐 Using Hosted Service (Recommended for Production)

Get instant access to Report Generation with our managed infrastructure - **no setup required**:

**🔗 [Get Free API Key →](https://www.mcp-handle.dev/home/api-keys)**

```bash
pip install mcp_handle
# or
npm install mcp_handle
```

```python
from mcp_handle import MCP Handle

mcp_handle = MCP Handle(api_key="your-free-key")
server = mcp_handle.mcp_server.create_server_instance("REPORT_GENERATION", "user123")
```

### 🐳 Using Docker (For Self-Hosting)

```bash
# Pull latest image
docker pull ghcr.io/weatherpal-ai/report-generation-mcp-server:latest


# Run Report Generation MCP Server
docker run -p 5000:5000 -e MCP_HANDLE_API_KEY=$MCP_HANDLE_API_KEY \
  ghcr.io/weatherpal-ai/report-generation-mcp-server:latest
```

**Setup:** Uses your MCP Handle API key for AI-powered report generation capabilities.

## 🛠️ Available Tools

- **Report Creation**: Generate professional reports from data and templates
- **Template Management**: Use and customize report templates
- **Data Integration**: Integrate data from various sources into reports
- **Format Options**: Export reports in multiple formats (PDF, Word, HTML)
- **Automated Insights**: Generate AI-powered insights and analysis

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
