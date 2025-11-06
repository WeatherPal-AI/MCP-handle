<template>
  <section id="architecture" class="section" style="background: var(--bg-light);">
    <div class="container">
      <h2 class="section-title">架构设计</h2>
      <p class="section-subtitle">
        分层解耦架构：从 AI 应用到底层工具的清晰抽象
      </p>

      <div class="architecture-diagram">
        <div class="arch-layer">
          <div class="layer-title">① 应用接入层 - AI Assistants</div>
          <div class="layer-items">
            <div class="arch-item">Claude Desktop</div>
            <div class="arch-item">VS Code / Cursor</div>
            <div class="arch-item">自定义 AI 应用</div>
          </div>
        </div>

        <div class="arch-arrow">↓ MCP Protocol</div>

        <div class="arch-layer highlight">
          <div class="layer-title">② 编排控制层 - MCP Handle Core</div>
          <div class="layer-items grid-3">
            <div class="arch-item primary">
              <div class="item-icon">🔄</div>
              <div class="item-name">Strata</div>
              <div class="item-desc">智能路由</div>
            </div>
            <div class="arch-item primary">
              <div class="item-icon">📊</div>
              <div class="item-name">Status</div>
              <div class="item-desc">运维监控</div>
            </div>
            <div class="arch-item primary">
              <div class="item-icon">🤖</div>
              <div class="item-name">Clients</div>
              <div class="item-desc">多端适配</div>
            </div>
          </div>
        </div>

        <div class="arch-arrow">↓ Tool Discovery & Execution</div>

        <div class="arch-layer">
          <div class="layer-title">③ 能力提供层 - MCP Servers (100+)</div>
          <div class="layer-items grid-4">
            <div class="arch-item small">GitHub</div>
            <div class="arch-item small">Gmail</div>
            <div class="arch-item small">Slack</div>
            <div class="arch-item small">Notion</div>
            <div class="arch-item small">Postgres</div>
            <div class="arch-item small">Supabase</div>
            <div class="arch-item small">Salesforce</div>
            <div class="arch-item small">+ 93 More</div>
          </div>
        </div>

        <div class="arch-arrow">↓ API Calls</div>

        <div class="arch-layer">
          <div class="layer-title">④ 外部服务层 - Third-party APIs</div>
          <div class="layer-items">
            <div class="arch-item">SaaS 平台</div>
            <div class="arch-item">数据库服务</div>
            <div class="arch-item">云基础设施</div>
          </div>
        </div>
      </div>

      <div class="project-structure">
        <h3 class="structure-title">📦 代码仓库组织</h3>
        <div class="structure-content">
          <div class="structure-item">
            <span class="folder">📚 docs/</span>
            <span class="description">Mintlify 文档站：API 参考、快速入门、集成指南</span>
          </div>
          <div class="structure-item">
            <span class="folder">🛠️ mcp_servers/</span>
            <span class="description">服务器实现：Python/TypeScript/Go 多语言，OAuth 开箱即用</span>
          </div>
          <div class="structure-item">
            <span class="folder">🤖 mcp-clients/</span>
            <span class="description">客户端适配器：Discord/Slack/Web/WhatsApp 统一 SDK</span>
          </div>
          <div class="structure-item">
            <span class="folder">🔄 open-strata/</span>
            <span class="description">核心路由：Python 实现的渐进式工具编排引擎</span>
          </div>
          <div class="structure-item">
            <span class="folder">📊 mcp_handle_status/</span>
            <span class="description">运维面板：Go 后端 + React 前端的监控管理系统</span>
          </div>
          <div class="structure-item">
            <span class="folder">🔐 _oauth_support/</span>
            <span class="description">认证基础设施：OAuth 流程封装与 Token 管理</span>
          </div>
          <div class="structure-item">
            <span class="folder">📖 examples/</span>
            <span class="description">实战案例：Claude/OpenAI/LangChain 等平台集成示例</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.architecture-diagram {
  max-width: 1100px;
  margin: 0 auto 3rem;
  padding: 2.5rem;
  background: white;
  border-radius: 18px;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-light);
  position: relative;
}

.architecture-diagram::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 20px;
  padding: 2px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.architecture-diagram:hover::before {
  opacity: 1;
}

.arch-layer {
  margin: 2rem 0;
  padding: 1.25rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.02), rgba(139, 92, 246, 0.02));
  border-radius: 14px;
  border: 1px solid var(--border-light);
  transition: all 0.3s ease;
}

.arch-layer:hover {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
  border-color: rgba(99, 102, 241, 0.2);
}

.layer-title {
  text-align: center;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--border-light);
  position: relative;
}

.layer-title::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
}

.layer-items {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.arch-item {
  background: white;
  border: 2px solid var(--border-color);
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  color: var(--text-dark);
  transition: all 0.3s ease;
}

.arch-item:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.arch-item.primary {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  border-color: var(--primary-color);
  padding: 1.5rem;
  text-align: center;
}

.arch-item.small {
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
}

.item-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.item-name {
  font-size: 1rem;
  font-weight: 700;
}

.item-desc {
  font-size: 0.85rem;
  color: var(--text-light);
  margin-top: 0.25rem;
}

.arch-arrow {
  text-align: center;
  font-size: 1.5rem;
  color: var(--primary-color);
  margin: 2rem 0;
  font-weight: 600;
  position: relative;
  padding: 1rem 0;
}

.arch-arrow::before,
.arch-arrow::after {
  content: '';
  position: absolute;
  left: 50%;
  width: 2px;
  height: 20px;
  background: linear-gradient(180deg, var(--primary-color), var(--secondary-color));
}

.arch-arrow::before {
  top: 0;
  transform: translateX(-50%);
}

.arch-arrow::after {
  bottom: 0;
  transform: translateX(-50%);
}

.arch-layer.highlight {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.08));
  padding: 2rem;
  border-radius: 16px;
  border: 2px solid rgba(99, 102, 241, 0.2);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1);
  position: relative;
  overflow: hidden;
}

.arch-layer.highlight::before {
  content: '⭐';
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  opacity: 0.3;
}

.arch-layer.highlight:hover {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(139, 92, 246, 0.12));
  border-color: rgba(99, 102, 241, 0.4);
}

.project-structure {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.structure-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--text-dark);
}

.structure-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.structure-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: var(--bg-light);
  transition: all 0.3s ease;
}

.structure-item:hover {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
  transform: translateX(5px);
}

.folder {
  font-weight: 700;
  color: var(--text-dark);
  min-width: 180px;
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
}

.description {
  color: var(--text-light);
}

@media (max-width: 768px) {
  .architecture-diagram {
    padding: 1rem;
  }

  .layer-items {
    gap: 0.5rem;
  }

  .arch-item {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }

  .project-structure {
    padding: 1.5rem;
  }

  .structure-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .folder {
    min-width: auto;
  }
}
</style>

