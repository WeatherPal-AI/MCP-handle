# Supabase MCP Server

A Model Context Protocol (MCP) server for Supabase integration. Manage database operations, authentication, and real-time subscriptions using Supabase's API.

## 🚀 Quick Start - Run in 30 Seconds

### 🌐 Using Hosted Service (Recommended for Production)

Get instant access to Supabase with our managed infrastructure - **no setup required**:

**🔗 [Get Free API Key →](https://www.mcp-handle.dev/home/api-keys)**

```bash
pip install mcp_handle
# or
npm install mcp_handle
```

```python
from mcp_handle import MCP Handle

mcp_handle = MCP Handle(api_key="your-free-key")
server = mcp_handle.mcp_server.create_server_instance("SUPABASE", "user123")
```

### 🐳 Using Docker (For Self-Hosting)

```bash
# Pull latest image
docker pull ghcr.io/weatherpal-ai/supabase-mcp-server:latest


# Run Supabase MCP Server with OAuth Support through MCP Handle AI
docker run -p 5000:5000 -e MCP_HANDLE_API_KEY=$MCP_HANDLE_API_KEY \
  ghcr.io/weatherpal-ai/supabase-mcp-server:latest

# Run Supabase MCP Server (no OAuth support)
docker run -p 5000:5000 \
  -e SUPABASE_URL=your_supabase_url \
  -e AUTH_DATA='{"access_token":"your_supabase_anon_key_here"}' \
  ghcr.io/weatherpal-ai/supabase-mcp-server:latest
```

**OAuth Setup:** Supabase requires OAuth authentication. Use `MCP_HANDLE_API_KEY` from your [free API key](https://www.mcp-handle.dev/home/api-keys) to handle the OAuth flow automatically.

**Manual Setup:** Alternatively, provide your Supabase URL and anon key directly.

## 🛠️ Available Tools

- **Database Operations**: Query, insert, update, and delete data
- **Authentication**: User management and authentication flows
- **Real-time**: Subscribe to database changes and real-time updates
- **Storage**: File upload and storage management
- **Functions**: Invoke Supabase Edge Functions

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
