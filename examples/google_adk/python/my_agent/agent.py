import os
import webbrowser

from google.adk.agents.llm_agent import Agent
from google.adk.tools.mcp_tool import StreamableHTTPConnectionParams
from google.adk.tools.mcp_tool.mcp_toolset import McpToolset
from mcp_handle import MCPHandle
from mcp_handle.types import McpServerName

from dotenv import load_dotenv
load_dotenv()

MCP_HANDLE_API_KEY = os.getenv("MCP_HANDLE_API_KEY")

# Initialize MCPHandle and set up Strata server
mcp_handle_client = MCPHandle(api_key=MCP_HANDLE_API_KEY)

user_id = "user_123"

# Create Strata server with multiple MCP servers
strata_response = mcp_handle_client.mcp_server.create_strata_server(
    servers=[McpServerName.GMAIL, McpServerName.SLACK],
    user_id=user_id
)

# Handle OAuth authentication
if strata_response.oauth_urls:
    for server_name, oauth_url in strata_response.oauth_urls.items():
        user_integration_auth = mcp_handle_client.user.get_user_auth(
            user_id=user_id,
            server_name=server_name
        )
        if not user_integration_auth.is_authenticated:
            print(f"🔐 Opening OAuth for {server_name}...")
            webbrowser.open(oauth_url)
            input(f"Press Enter after completing {server_name} OAuth authorization...")

mcp_server_url = strata_response.strata_server_url

# Create AI agent with MCP toolset (exposed at module level for ADK)
root_agent = Agent(
    name="my_agent",
    model="gemini-2.5-flash",
    description="An agent with access to tools through MCPHandle MCP",
    instruction="You are a helpful assistant with access to MCP tools.",
    tools=[
        McpToolset(
            connection_params=StreamableHTTPConnectionParams(
                url=mcp_server_url,
            ),
        )
    ],
)

