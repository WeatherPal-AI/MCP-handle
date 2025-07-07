# Gmail MCP Server

A Model Context Protocol (MCP) server for Gmail integration. Read, send, and manage emails through Gmail's API with full OAuth support.

## 🚀 Quick Start - Run in 30 Seconds

### 🌐 Using Hosted Service (Recommended for Production)

Get instant access to Gmail with our managed infrastructure - **no setup required**:

**🔗 [Get Free API Key →](https://www.mcp-handle.dev/home/api-keys)**

```bash
pip install mcp_handle
# or
npm install mcp_handle
```

```python
from mcp_handle import MCP Handle

mcp_handle = MCP Handle(api_key="your-free-key")
server = mcp_handle.mcp_server.create_server_instance("GMAIL", "user123")
```

### 🐳 Using Docker (For Self-Hosting)

```bash
# Pull latest image
docker pull ghcr.io/weatherpal-ai/gmail-mcp-server:latest


# Run Gmail MCP Server with OAuth Support through MCP Handle AI
docker run -p 5000:5000 -e MCP_HANDLE_API_KEY=$MCP_HANDLE_API_KEY \
  ghcr.io/weatherpal-ai/gmail-mcp-server:latest

# Run Gmail MCP Server (no OAuth support)
docker run -p 5000:5000 -e AUTH_DATA='{"access_token":"your_gmail_access_token_here"}' \
  ghcr.io/weatherpal-ai/gmail-mcp-server:latest
```

**OAuth Setup:** Gmail requires OAuth authentication. Use `MCP_HANDLE_API_KEY` from your [free API key](https://www.mcp-handle.dev/home/api-keys) to handle the OAuth flow automatically.

## 🛠️ Available Tools

### Email Operations
- **Email Reading**: Fetch emails, search messages, get message details
- **Email Sending**: Send new emails with attachments and rich formatting
- **Email Management**: Mark as read/unread, archive, delete emails
- **Label Management**: Apply, remove, and manage Gmail labels
- **Thread Management**: Handle email conversations and threads
- **Attachments**: Download and extract content from email attachments (PDF, Word, Excel, images, etc.)

### Contact Search
- **Search Contacts**: Search for contacts by name or email address using `gmail_search_contacts`
  - Supports four contact types:
    - `all` (default): Searches all sources in parallel, returns three independent result sets (personal, other, directory) each with its own pagination token
    - `personal`: Searches your saved contacts
    - `other`: Searches other contact sources (Gmail suggestions, etc.)
    - `directory`: Searches domain directory and domain contacts (requires directory.readonly scope)
  - Directory source options (only used with `directory` or `all` type):
    - `UNSPECIFIED`: Searches both DOMAIN_PROFILE and DOMAIN_CONTACT (default)
    - `DOMAIN_DIRECTORY`: Searches domain profiles only
    - `DOMAIN_CONTACTS`: Searches domain contacts only
  - Flexible query matching against names, email addresses, and phone numbers
  - Returns contact details including display name, email addresses, phone numbers, and organizations
  - **Pagination**: When `contactType` is `all`, returns separate pagination tokens for each source type, allowing flexible independent pagination
  - Paginated results with configurable page size (max 30 for personal/other, max 500 for directory)

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
