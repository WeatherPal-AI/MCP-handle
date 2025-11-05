<template>
  <section id="contributing" class="section">
    <div class="container">
      <h2 class="section-title">开源协作</h2>
      <p class="section-subtitle">
        我们欢迎所有形式的贡献 - 代码、文档、测试、反馈
      </p>

      <div class="grid grid-2">
        <div class="card contribute-card">
          <div class="contribute-icon">🚀</div>
          <h3 class="contribute-title">贡献流程</h3>
          <div class="steps">
            <div class="step">
              <span class="step-number">1</span>
              <div class="step-content">
                <strong>Fork & Clone</strong>
                <p>Fork 仓库到个人账户，克隆到本地开发环境</p>
              </div>
            </div>
            <div class="step">
              <span class="step-number">2</span>
              <div class="step-content">
                <strong>Branch & Develop</strong>
                <p>从 main 切出功能分支（feat/fix/docs/...）</p>
              </div>
            </div>
            <div class="step">
              <span class="step-number">3</span>
              <div class="step-content">
                <strong>Test & PR</strong>
                <p>确保测试通过，提交 PR 并关联 Issue</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card contribute-card">
          <div class="contribute-icon">📝</div>
          <h3 class="contribute-title">典型贡献场景</h3>
          <ul class="contribute-list">
            <li>
              <span class="icon">🔌</span>
              <div>
                <strong>新增 MCP Server</strong>
                <p>为新的 SaaS 服务实现 MCP 适配器（参考模板）</p>
              </div>
            </li>
            <li>
              <span class="icon">🐛</span>
              <div>
                <strong>Bug 修复</strong>
                <p>在 Issues 中认领问题，本地复现并提交修复</p>
              </div>
            </li>
            <li>
              <span class="icon">📖</span>
              <div>
                <strong>文档改进</strong>
                <p>补充集成案例、API 说明、最佳实践文档</p>
              </div>
            </li>
            <li>
              <span class="icon">✨</span>
              <div>
                <strong>功能增强</strong>
                <p>为 Strata/Status 添加新特性（需先提 RFC）</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="guidelines">
        <h3 class="guidelines-title">📋 贡献规范</h3>
        <div class="guidelines-grid">
          <div class="guideline-item">
            <div class="guideline-icon">💻</div>
            <h4>代码规范</h4>
            <p>遵循项目的代码风格和最佳实践</p>
          </div>
          <div class="guideline-item">
            <div class="guideline-icon">💬</div>
            <h4>清晰注释</h4>
            <p>保持代码注释简洁明了</p>
          </div>
          <div class="guideline-item">
            <div class="guideline-icon">🧪</div>
            <h4>添加测试</h4>
            <p>为新功能添加相应的测试用例</p>
          </div>
          <div class="guideline-item">
            <div class="guideline-icon">📄</div>
            <h4>开源协议</h4>
            <p>遵守 Apache 2.0 开源协议</p>
          </div>
        </div>
      </div>

      <div class="community">
        <h3 class="community-title">🌟 加入社区</h3>
        <div class="community-links">
          <a href="https://github.com/WeatherPal-AI/MCP-handle" target="_blank" class="community-link">
            <span class="link-icon">🐙</span>
            <div>
              <strong>GitHub</strong>
              <p>查看代码、提交 Issue</p>
            </div>
          </a>
          <a href="https://discord.gg/p7TuTEcson" target="_blank" class="community-link">
            <span class="link-icon">💬</span>
            <div>
              <strong>Discord</strong>
              <p>加入讨论社区</p>
            </div>
          </a>
          <a href="https://www.mcp-handle.com/docs" target="_blank" class="community-link">
            <span class="link-icon">📚</span>
            <div>
              <strong>文档</strong>
              <p>完整的开发文档</p>
            </div>
          </a>
          <a href="https://www.mcp-handle.com" target="_blank" class="community-link">
            <span class="link-icon">🌐</span>
            <div>
              <strong>官网</strong>
              <p>了解最新动态</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.contribute-card {
  height: 100%;
}

.contribute-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.contribute-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--text-dark);
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.step-number {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.step-content strong {
  display: block;
  margin-bottom: 0.25rem;
  color: var(--text-dark);
}

.step-content p {
  color: var(--text-light);
  font-size: 0.9rem;
}

.contribute-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contribute-list li {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.contribute-list .icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.contribute-list strong {
  display: block;
  margin-bottom: 0.25rem;
  color: var(--text-dark);
}

.contribute-list p {
  color: var(--text-light);
  font-size: 0.9rem;
}

.guidelines {
  margin-top: 3rem;
  padding: 2.5rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
  border-radius: 16px;
}

.guidelines-title {
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-dark);
}

.guidelines-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.guideline-item {
  text-align: center;
}

.guideline-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.guideline-item h4 {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
}

.guideline-item p {
  color: var(--text-light);
  font-size: 0.9rem;
}

.community {
  margin-top: 3rem;
}

.community-title {
  font-size: 1.625rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.75rem;
  color: var(--text-dark);
}

.community-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.community-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.community-link:hover {
  border-color: var(--primary-color);
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(99, 102, 241, 0.2);
}

.link-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.community-link strong {
  display: block;
  color: var(--text-dark);
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
}

.community-link p {
  color: var(--text-light);
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .guidelines {
    padding: 2rem 1rem;
  }

  .guidelines-grid {
    gap: 1.5rem;
  }
}
</style>

