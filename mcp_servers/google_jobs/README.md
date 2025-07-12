# Google Jobs MCP Server

A Model Context Protocol (MCP) server for Google Jobs API integration. Search and access job listings using Google's Jobs API.

## 🚀 Quick Start - Run in 30 Seconds

### 🌐 Using Hosted Service (Recommended for Production)

Get instant access to Google Jobs with our managed infrastructure - **no setup required**:

**🔗 [Get Free API Key →](https://www.mcp-handle.dev/home/api-keys)**

```bash
pip install mcp_handle
# or
npm install mcp_handle
```

```python
from mcp_handle import MCP Handle

mcp_handle = MCP Handle(api_key="your-free-key")
server = mcp_handle.mcp_server.create_server_instance("GOOGLE_JOBS", "user123")
```

### 🐳 Using Docker (For Self-Hosting)

```bash
# Pull latest image
docker pull ghcr.io/weatherpal-ai/google-jobs-mcp-server:latest


# Run Google Jobs MCP Server
docker run -p 5000:5000 -e API_KEY=$API_KEY \
  ghcr.io/weatherpal-ai/google-jobs-mcp-server:latest
```

**API Key Setup:** Get your Google API key from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and enable the Google Jobs API.

## 🛠️ Available Tools

- **Job Search**: Search for job listings by keywords, location, and filters
- **Job Details**: Get detailed information about specific job postings
- **Company Information**: Access employer details and company profiles
- **Location-based Search**: Find jobs in specific geographic areas
- **Filter Options**: Apply various filters for salary, experience, job type

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
