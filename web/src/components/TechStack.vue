<template>
  <section id="tech-stack" class="section">
    <div class="container">
      <h2 class="section-title">技术选型</h2>
      <p class="section-subtitle">
        多语言混合架构，发挥各语言生态优势
      </p>

      <div class="grid grid-3">
        <div class="card tech-card" v-for="(tech, index) in techStack" :key="index">
          <div class="tech-icon">{{ tech.icon }}</div>
          <h3 class="tech-name">{{ tech.name }}</h3>
          <p class="tech-description">{{ tech.description }}</p>
          <div class="tech-tags">
            <span class="tag" v-for="(tag, i) in tech.tags" :key="i">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const techStack = [
  {
    icon: '🐍',
    name: 'Python 3.12+',
    description: '服务器主力：丰富的第三方库生态，快速集成各类 SaaS API',
    tags: ['FastAPI', 'Pydantic', 'Async/Await']
  },
  {
    icon: '📘',
    name: 'TypeScript',
    description: 'Web 端核心：类型安全保障 + 官方 MCP SDK 最佳支持',
    tags: ['Node.js 18+', '@modelcontextprotocol/sdk', 'Zod']
  },
  {
    icon: '🔷',
    name: 'Go 1.20+',
    description: '高并发场景：Status 后端与 GitHub Server 的性能首选',
    tags: ['Gin Framework', 'Goroutine', '静态编译']
  },
  {
    icon: '⚛️',
    name: 'React 18',
    description: 'UI 交互层：Status 仪表板的实时数据可视化',
    tags: ['TypeScript', 'Vite', 'TailwindCSS']
  },
  {
    icon: '💚',
    name: 'Vue 3',
    description: '轻量级前端：本介绍站点采用的渐进式框架',
    tags: ['Composition API', 'Vite', '响应式设计']
  },
  {
    icon: '🐳',
    name: 'Docker',
    description: '统一部署：所有服务器提供预构建镜像，开箱即用',
    tags: ['Multi-stage', 'GHCR', 'Compose']
  },
  {
    icon: '🔐',
    name: 'OAuth 2.0',
    description: '企业级认证：内置 Authorization Code + PKCE 流程',
    tags: ['Token 管理', '自动刷新', 'RBAC']
  },
  {
    icon: '🗄️',
    name: 'SQLite',
    description: '嵌入式存储：Status 服务的分析数据与审计日志',
    tags: ['零配置', '事务支持', 'FTS5 全文检索']
  },
  {
    icon: '🔌',
    name: 'MCP Protocol',
    description: '标准通信层：支持 stdio/HTTP/SSE 三种传输协议',
    tags: ['JSON-RPC 2.0', 'Tool Schema', 'Resource API']
  }
]
</script>

<style scoped>
.tech-card {
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.tech-icon {
  font-size: 4rem;
  margin-bottom: 1.25rem;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.tech-card:hover .tech-icon {
  transform: scale(1.1) translateY(-5px);
}

.tech-name {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.875rem;
  color: var(--text-dark);
  position: relative;
  display: inline-block;
}

.tech-name::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 2px;
  opacity: 0;
  transition: all 0.3s ease;
}

.tech-card:hover .tech-name::after {
  opacity: 1;
  width: 60px;
}

.tech-description {
  color: var(--text-light);
  margin-bottom: 1.25rem;
  line-height: 1.65;
  font-size: 0.875rem;
  flex-grow: 1;
}

.tech-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.tag {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(139, 92, 246, 0.12));
  color: var(--primary-color);
  padding: 7px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1.5px solid rgba(99, 102, 241, 0.25);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.tag::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.tech-card:hover .tag {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(99, 102, 241, 0.3);
}

.tech-card:hover .tag::before {
  left: 100%;
}
</style>

