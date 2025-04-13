# mcp_handle

A CLI tool for easily managing MCP Handle AI MCP servers in Google Gemini CLI.

## Installation

```bash
npm install -g mcp_handle
```

## Usage

### Help

```bash
mcp_handle gemini --help
```

Shows detailed help information with all commands and examples.

## Commands

### Add MCP Server

```bash
mcp_handle gemini add <INSTANCE_URL>
```

**Parameters:**
- `<INSTANCE_URL>`: URL of your MCP server instance.

**Note:** Only MCP Handle AI MCPs can be added with this tool.

### Remove MCP Server

```bash
mcp_handle gemini remove <MCP_NAME>
```

**Parameters:**
- `<MCP_NAME>`: Name of the MCP to remove (e.g., `gmail`, `slack`, `notion`)

**Note:** Only MCP Handle AI MCPs can be removed with this tool.

### List MCP Servers

```bash
mcp_handle gemini list
```

Shows all currently configured MCP Handle AI MCP servers.

### Clear All MCP Servers

```bash
mcp_handle gemini clear --force
```

Removes all MCP Handle AI MCP servers from the configuration. Requires `--force` flag for safety.

### Examples

**Add Gmail MCP Server:**
```bash
mcp_handle gemini add https://gmail-mcp-server.mcp-handle.dev/mcp/?instance_id=your-id
```

**Add Slack MCP Server:**
```bash
mcp_handle gemini add https://slack-mcp-server.mcp-handle.dev/mcp/?instance_id=your-id
```

**Add Notion MCP Server:**
```bash
mcp_handle gemini add https://notion-mcp-server.mcp-handle.dev/mcp/?instance_id=your-id
```

**Remove Gmail MCP Server:**
```bash
mcp_handle gemini remove gmail
```

**Remove Slack MCP Server:**
```bash
mcp_handle gemini remove slack
```

**List all MCP Servers:**
```bash
mcp_handle gemini list
```

**Clear all MCP Servers:**
```bash
mcp_handle gemini clear --force
```

## What It Does

1. **Locates** your Gemini config settings (`~/.gemini/settings.json`)
2. **Creates backup** of existing settings
3. **Adds, removes, lists, or clears** MCP Handle AI MCP server configurations in your Gemini settings
4. **Preserves** all existing preferences and authentication

## Configuration

After adding an MCP server, it will be added to `~/.gemini/settings.json`:

```json
{
  "mcpServers": {
    "gmail": {
      "command": "npx",
      "args": ["mcp-remote", "https://gmail-mcp-server.mcp-handle.dev/mcp/?instance_id=your-id"]
    }
  }
}
```

## Requirements

- Node.js 14.0.0 or higher
- Google Gemini installed with `.gemini` configuration directory

## License

MIT