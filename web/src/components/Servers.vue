<template>
  <section id="servers" class="section" style="background: var(--bg-light);">
    <div class="container">
      <h2 class="section-title">MCP 服务器</h2>
      <p class="section-subtitle">
        超过 100 个生产就绪的集成服务
      </p>

      <div class="server-categories">
        <div class="category-tabs">
          <button 
            v-for="category in categories" 
            :key="category.name"
            :class="['tab', { active: activeCategory === category.name }]"
            @click="activeCategory = category.name"
          >
            {{ category.icon }} {{ category.name }}
          </button>
        </div>

        <div class="category-content">
          <div class="grid grid-4">
            <div 
              class="server-card" 
              v-for="server in getCurrentServers" 
              :key="server.name"
            >
              <div class="server-header">
                <span class="server-icon">{{ server.icon }}</span>
                <span v-if="server.oauth" class="oauth-badge">OAuth</span>
              </div>
              <h4 class="server-name">{{ server.name }}</h4>
              <p class="server-description">{{ server.description }}</p>
              <div class="server-tech">
                <span class="tech-tag">{{ server.tech }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('开发工具')

const categories = [
  {
    name: '开发工具',
    icon: '💻',
    servers: [
      { name: 'GitHub', icon: '🐙', description: 'Git 仓库管理', tech: 'Go', oauth: true },
      { name: 'GitLab', icon: '🦊', description: 'DevOps 平台', tech: 'Python', oauth: true },
      { name: 'Jira', icon: '📋', description: '项目管理工具', tech: 'TypeScript', oauth: true },
      { name: 'Linear', icon: '📈', description: '问题跟踪系统', tech: 'Python', oauth: true },
      { name: 'Figma', icon: '🎨', description: '设计协作平台', tech: 'Python', oauth: true },
      { name: 'Asana', icon: '✅', description: '任务管理工具', tech: 'Python', oauth: true },
      { name: 'ClickUp', icon: '⚡', description: '项目管理平台', tech: 'Python', oauth: true },
      { name: 'Trello', icon: '📊', description: '看板管理工具', tech: 'Python', oauth: true }
    ]
  },
  {
    name: '通信平台',
    icon: '💬',
    servers: [
      { name: 'Gmail', icon: '📧', description: '邮件服务', tech: 'TypeScript', oauth: true },
      { name: 'Slack', icon: '💬', description: '团队协作', tech: 'Python', oauth: true },
      { name: 'Discord', icon: '🎮', description: '社区平台', tech: 'Python', oauth: true },
      { name: 'WhatsApp', icon: '📱', description: '即时通讯', tech: 'TypeScript', oauth: true },
      { name: 'Outlook', icon: '📮', description: '企业邮箱', tech: 'Python', oauth: true },
      { name: 'Twilio', icon: '📞', description: '通信 API', tech: 'Python', oauth: true },
      { name: 'Resend', icon: '✉️', description: '邮件发送服务', tech: 'TypeScript', oauth: false },
      { name: 'Intercom', icon: '💭', description: '客户沟通平台', tech: 'TypeScript', oauth: true }
    ]
  },
  {
    name: '生产力',
    icon: '📝',
    servers: [
      { name: 'Notion', icon: '📓', description: '知识管理', tech: 'Python', oauth: true },
      { name: 'Google Docs', icon: '📄', description: '文档编辑', tech: 'Python', oauth: true },
      { name: 'Google Sheets', icon: '📊', description: '电子表格', tech: 'Python', oauth: true },
      { name: 'Google Drive', icon: '📁', description: '云存储', tech: 'Python', oauth: true },
      { name: 'Google Calendar', icon: '📅', description: '日历管理', tech: 'Python', oauth: true },
      { name: 'Dropbox', icon: '📦', description: '文件同步', tech: 'TypeScript', oauth: true },
      { name: 'OneDrive', icon: '☁️', description: '云存储服务', tech: 'Python', oauth: true },
      { name: 'Calendly', icon: '🗓️', description: '会议安排', tech: 'Python', oauth: true }
    ]
  },
  {
    name: '数据分析',
    icon: '📊',
    servers: [
      { name: 'Postgres', icon: '🐘', description: '关系数据库', tech: 'TypeScript', oauth: false },
      { name: 'Supabase', icon: '⚡', description: 'Backend as a Service', tech: 'TypeScript', oauth: true },
      { name: 'Mixpanel', icon: '📈', description: '用户分析', tech: 'Python', oauth: true },
      { name: 'Google Analytics', icon: '📊', description: '网站分析', tech: 'Python', oauth: true },
      { name: 'HubSpot', icon: '🎯', description: 'CRM 平台', tech: 'Python', oauth: true },
      { name: 'Salesforce', icon: '☁️', description: '企业 CRM', tech: 'Python', oauth: true },
      { name: 'Airtable', icon: '🗂️', description: '云端数据库', tech: 'Python', oauth: true },
      { name: 'Monday', icon: '📋', description: '工作操作系统', tech: 'TypeScript', oauth: true }
    ]
  },
  {
    name: 'AI & 搜索',
    icon: '🤖',
    servers: [
      { name: 'OpenRouter', icon: '🔀', description: 'AI 模型路由', tech: 'Python', oauth: false },
      { name: 'Perplexity AI', icon: '🔍', description: 'AI 搜索引擎', tech: 'Python', oauth: false },
      { name: 'Brave Search', icon: '🦁', description: '隐私搜索', tech: 'Python', oauth: false },
      { name: 'Tavily', icon: '🔎', description: 'AI 搜索 API', tech: 'Python', oauth: false },
      { name: 'Exa', icon: '🌐', description: '语义搜索', tech: 'Python', oauth: false },
      { name: 'Firecrawl', icon: '🔥', description: '网页爬取', tech: 'TypeScript', oauth: false },
      { name: 'Mem0', icon: '🧠', description: 'AI 记忆层', tech: 'Python', oauth: false },
      { name: 'HeyGen', icon: '🎥', description: 'AI 视频生成', tech: 'Python', oauth: true }
    ]
  },
  {
    name: '其他服务',
    icon: '🔧',
    servers: [
      { name: 'Shopify', icon: '🛍️', description: '电商平台', tech: 'TypeScript', oauth: true },
      { name: 'Spotify', icon: '🎵', description: '音乐服务', tech: 'Python', oauth: true },
      { name: 'YouTube', icon: '📺', description: '视频平台', tech: 'Python', oauth: true },
      { name: 'WordPress', icon: '📰', description: '内容管理', tech: 'TypeScript', oauth: true },
      { name: 'Coinbase', icon: '💰', description: '加密货币', tech: 'Python', oauth: true },
      { name: 'QuickBooks', icon: '💼', description: '财务管理', tech: 'Python', oauth: true },
      { name: 'Cal.com', icon: '📆', description: '会议调度', tech: 'Python', oauth: true },
      { name: 'Gong', icon: '🎤', description: '销售智能', tech: 'Python', oauth: true }
    ]
  }
]

const getCurrentServers = computed(() => {
  const category = categories.find(c => c.name === activeCategory.value)
  return category ? category.servers : []
})
</script>

<style scoped>
.server-categories {
  margin-top: 2rem;
}

.category-tabs {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2.25rem;
  overflow-x: auto;
  padding: 0.875rem;
  justify-content: center;
  flex-wrap: wrap;
  background: white;
  border-radius: 14px;
  box-shadow: var(--shadow-sm);
}

.tab {
  padding: 12px 28px;
  border: 2px solid transparent;
  background: var(--bg-light);
  border-radius: 50px;
  font-weight: 600;
  color: var(--text-medium);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  position: relative;
}

.tab::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50px;
  padding: 2px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tab:hover {
  background: rgba(99, 102, 241, 0.05);
  color: var(--primary-color);
  transform: translateY(-2px);
}

.tab:hover::before {
  opacity: 1;
}

.tab.active {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  transform: translateY(-2px);
}

.tab.active::before {
  opacity: 0;
}

.category-content {
  min-height: 400px;
}

.server-card {
  background: white;
  padding: 1.5rem;
  border-radius: 14px;
  border: 1px solid var(--border-light);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.server-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.03), rgba(139, 92, 246, 0.03));
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.server-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(99, 102, 241, 0.15);
  border-color: rgba(99, 102, 241, 0.3);
}

.server-card:hover::after {
  opacity: 1;
}

.server-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  position: relative;
  z-index: 1;
}

.server-icon {
  font-size: 2.5rem;
  transition: transform 0.3s ease;
  display: inline-block;
}

.server-card:hover .server-icon {
  transform: scale(1.15) rotate(-5deg);
}

.oauth-badge {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.25));
  color: var(--success-color);
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
  border: 1.5px solid rgba(16, 185, 129, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
}

.server-name {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text-dark);
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
}

.server-card:hover .server-name {
  color: var(--primary-color);
}

.server-description {
  color: var(--text-light);
  font-size: 0.875rem;
  margin-bottom: 1.25rem;
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

.server-tech {
  display: flex;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
}

.tech-tag {
  background: linear-gradient(135deg, var(--bg-light), #f3f4f6);
  color: var(--text-medium);
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid var(--border-light);
  transition: all 0.2s ease;
}

.server-card:hover .tech-tag {
  background: white;
  border-color: rgba(99, 102, 241, 0.2);
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .category-tabs {
    justify-content: flex-start;
  }
}
</style>

