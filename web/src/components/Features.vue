<template>
  <section id="features" class="section">
    <div class="container">
      <h2 class="section-title">核心能力</h2>
      <p class="section-subtitle">
        四大模块协同工作，构建完整的 MCP 工具编排体系
      </p>

      <div class="features-list">
        <div class="card feature-card" v-for="(feature, index) in features" :key="index">
          <div class="feature-icon">{{ feature.icon }}</div>
          <div class="feature-content">
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
            <ul class="feature-list">
              <li v-for="(item, i) in feature.points" :key="i">
                <span class="check-icon">✓</span>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: '🔄',
    title: 'Strata - 智能路由引擎',
    description: '渐进式工具发现机制，动态管理 MCP 服务器集群，避免工具过载',
    points: [
      '按需暴露：AI 初始只看到核心工具，避免选择困难',
      '上下文感知：根据对话进展动态加载相关工具',
      '协议无关：统一支持 stdio、HTTP、SSE 三种通信方式',
      '认证透传：OAuth 2.0 令牌自动管理与刷新'
    ]
  },
  {
    icon: '📊',
    title: 'Status - 运维管控中心',
    description: '集成式管理仪表板（Go + React），实时掌控所有 MCP 服务健康状态',
    points: [
      '服务生命周期：一键安装/配置/重启 MCP 服务器',
      '性能监控：延迟、成功率、资源占用实时可视化',
      'RBAC 权限：多租户隔离，基于角色的精细化访问控制',
      '使用分析：工具调用统计、热点识别、成本归因'
    ]
  },
  {
    icon: '🛠️',
    title: 'Servers - 开箱即用生态',
    description: '100+ 预集成服务器覆盖 6 大场景，开发/SaaS/数据全面覆盖',
    points: [
      '开发协同：GitHub/GitLab/Jira 代码与项目管理',
      '企业通信：Gmail/Slack/Teams 邮件与消息集成',
      '办公套件：Notion/Google Docs/Sheets 文档自动化',
      '数据基础：Postgres/MySQL/Supabase 数据库操作'
    ]
  },
  {
    icon: '🤖',
    title: 'Clients - 多端统一体验',
    description: '跨平台 MCP 客户端，让 AI 能力无缝嵌入现有工作流',
    points: [
      'Discord/Slack：社区与企业即时通讯深度集成',
      'Web 客户端：支持实时流式响应的浏览器界面',
      'WhatsApp Bot：面向 C 端的 Business API 连接',
      'CLI 工具：命令行环境的自动化任务执行'
    ]
  }
]
</script>

<style scoped>
.features-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  position: relative;
  overflow: visible;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1.75rem;
  padding: 1.75rem;
}

@media (max-width: 768px) {
  .feature-card {
    flex-direction: column;
    gap: 1rem;
  }
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 16px 16px 0 0;
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.feature-icon {
  font-size: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  flex-shrink: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  border-radius: 18px;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.05) rotate(3deg);
}

.feature-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.625rem;
  color: var(--text-dark);
  background: linear-gradient(135deg, var(--text-dark), var(--text-medium));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.feature-description {
  color: var(--text-light);
  margin-bottom: 1rem;
  line-height: 1.65;
  font-size: 0.9375rem;
}

.feature-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem 1.5rem;
}

@media (max-width: 768px) {
  .feature-list {
    grid-template-columns: 1fr;
  }
}

.feature-list li {
  padding: 0.5rem 0;
  color: var(--text-medium);
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.925rem;
  line-height: 1.5;
  transition: all 0.2s ease;
}

.feature-list li:hover {
  padding-left: 0.5rem;
  color: var(--text-dark);
  transform: translateX(4px);
}

.check-icon {
  color: var(--success-color);
  font-weight: 700;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 185, 129, 0.1);
  border-radius: 50%;
  font-size: 0.75rem;
}
</style>

