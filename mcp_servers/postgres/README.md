# PostgreSQL MCP Server

A Model Context Protocol (MCP) server for PostgreSQL database integration. Execute read-only SQL queries and inspect database schemas safely.

## 🚀 Quick Start - Run in 30 Seconds

### 🌐 Using Hosted Service (Recommended for Production)

Get instant access to PostgreSQL with our managed infrastructure - **no setup required**:

**🔗 [Get Free API Key →](https://www.mcp-handle.dev/home/api-keys)**

```bash
pip install mcp_handle
# or
npm install mcp_handle
```

```python
from mcp_handle import MCP Handle

mcp_handle = MCP Handle(api_key="your-free-key")
server = mcp_handle.mcp_server.create_server_instance("POSTGRES", "user123")
```

### 🐳 Using Docker (For Self-Hosting)

```bash
# Pull latest image
docker pull ghcr.io/weatherpal-ai/postgres-mcp-server:latest


# Run PostgreSQL MCP Server
docker run -p 5000:5000 \
  -e API_KEY="postgresql://user:password@host:port/database" \
  ghcr.io/weatherpal-ai/postgres-mcp-server:latest
```

**Connection Setup:** Provide your PostgreSQL connection string via `API_KEY`. The server automatically wraps all queries in read-only transactions for safety.

## 🛠️ Available Tools

- **SQL Queries**: Execute safe, read-only SQL queries
- **Schema Inspection**: Browse table schemas and column information
- **Database Resources**: Access table metadata and structure information
- **Query Results**: Get structured JSON results from SQL queries

All queries are automatically wrapped in `BEGIN TRANSACTION READ ONLY` to ensure no data modification occurs.

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
