import { Mastra } from '@mastra/core/mastra';
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { MCPClient } from '@mastra/mcp';
import { MCPHandleClient, MCPHandle } from 'mcp_handle';
import open from 'open';

/**
 * Creates an MCP Agent with tools from MCPHandle Strata server
 * Strata servers support multiple MCP servers (Here use Gmail, Slack)
 */
export const createMcpAgent = async (userId: string = 'test-user'): Promise<Agent> => {
  const mcp_handle = new MCPHandleClient({ apiKey: process.env.MCP_HANDLE_API_KEY! });

  // Create a Strata MCP Server with Gmail and Slack
  const response = await mcp_handle.mcpServer.createStrataServer({
    servers: [MCPHandle.McpServerName.Gmail, MCPHandle.McpServerName.Slack],
    userId
  });

  // Handle OAuth authorization for each service
  if (response.oauthUrls) {
    for (const [serverName, oauthUrl] of Object.entries(response.oauthUrls)) {
      await open(oauthUrl);
      console.log(`Please complete ${serverName} OAuth authorization at: ${oauthUrl}`);
    }
  }

  // Initialize the MCP client with Strata server URL
  const mcpClient = new MCPClient({
    servers: {
      strata: {
        url: new URL(response.strataServerUrl)
      }
    }
  });

  // Create agent
  return new Agent({
    name: 'MCP Agent',
    instructions: `You are an AI agent with access to MCP tools.`,
    model: openai('gpt-4o'),
    tools: await mcpClient.getTools()
  });
};

const agent = await createMcpAgent();

export const mastra = new Mastra({
  agents: { agent }
});