# Shopify MCP Server

A Model Context Protocol (MCP) server for Shopify integration. Manage products, orders, customers, and store operations using Shopify's API with OAuth support.

## 🚀 Quick Start - Run in 30 Seconds

### 🌐 Using Hosted Service (Recommended for Production)

Get instant access to Shopify with our managed infrastructure - **no setup required**:

**🔗 [Get Free API Key →](https://www.mcp-handle.dev/home/api-keys)**

```bash
pip install mcp_handle
# or
npm install mcp_handle
```

```python
from mcp_handle import MCP Handle

mcp_handle = MCP Handle(api_key="your-free-key")
server = mcp_handle.mcp_server.create_server_instance("SHOPIFY", "user123")
```

### 🐳 Using Docker (For Self-Hosting)

```bash
# Pull latest image
docker pull ghcr.io/weatherpal-ai/shopify-mcp-server:latest


# Run Shopify MCP Server with OAuth Support through MCP Handle AI
docker run -p 5000:5000 -e MCP_HANDLE_API_KEY=$MCP_HANDLE_API_KEY \
  ghcr.io/weatherpal-ai/shopify-mcp-server:latest

# Run Shopify MCP Server (no OAuth support)
docker run -p 5000:5000 -e AUTH_DATA='{"access_token":"your_shopify_access_token_here"}' \
  ghcr.io/weatherpal-ai/shopify-mcp-server:latest
```

**OAuth Setup:** Shopify requires OAuth authentication. Use `MCP_HANDLE_API_KEY` from your [free API key](https://www.mcp-handle.dev/home/api-keys) to handle the OAuth flow automatically.

## 🛠️ Available Tools

- **Product Management**: Create, read, update products and variants
- **Order Processing**: Manage orders, fulfillments, and refunds
- **Customer Management**: Handle customer data and profiles
- **Inventory Control**: Track and manage inventory levels
- **Store Analytics**: Access sales data and analytics

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
