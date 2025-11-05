<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-logo">
            <span class="logo-icon">🚀</span>
            <span class="logo-text">MCP-Handle</span>
          </div>
          <p class="footer-description">
            开源 AI 工具编排平台，让 AI Agent 能够可靠地在任何规模下使用任何工具。
          </p>
          <div class="footer-badges">
            <a href="https://github.com/WeatherPal-AI/MCP-handle" target="_blank">
              <img src="https://img.shields.io/github/stars/WeatherPal-AI/MCP-handle?style=social" alt="GitHub stars">
            </a>
          </div>
        </div>

        <div class="footer-section">
          <h4 class="footer-title">产品</h4>
          <ul class="footer-links">
            <li><a href="#features">核心功能</a></li>
            <li><a href="#servers">MCP 服务器</a></li>
            <li><a href="#tech-stack">技术栈</a></li>
            <li><a href="#architecture">系统架构</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="footer-title">资源</h4>
          <ul class="footer-links">
            <li><a href="https://www.mcp-handle.com/docs" target="_blank">文档</a></li>
            <li><a href="https://github.com/WeatherPal-AI/MCP-handle/tree/main/examples" target="_blank">示例</a></li>
            <li><a href="https://github.com/WeatherPal-AI/MCP-handle" target="_blank">GitHub</a></li>
            <li><a href="#contributing">贡献指南</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="footer-title">社区</h4>
          <ul class="footer-links">
            <li><a href="https://discord.gg/p7TuTEcson" target="_blank">Discord</a></li>
            <li><a href="https://github.com/WeatherPal-AI/MCP-handle/issues" target="_blank">问题反馈</a></li>
            <li><a href="https://www.mcp-handle.com" target="_blank">官方网站</a></li>
            <li><a href="https://github.com/WeatherPal-AI/MCP-handle/discussions" target="_blank">讨论区</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>© 2024 MCP-Handle by <strong>WeatherPal-AI (低温宝)</strong></p>
          <p>Licensed under <a href="https://github.com/WeatherPal-AI/MCP-handle/blob/main/LICENSE" target="_blank">Apache 2.0</a></p>
        </div>
        <div class="footer-social">
          <a href="https://github.com/WeatherPal-AI/MCP-handle" target="_blank" class="social-link" title="GitHub">
            🐙
          </a>
          <a href="https://discord.gg/p7TuTEcson" target="_blank" class="social-link" title="Discord">
            💬
          </a>
          <a href="https://www.mcp-handle.com" target="_blank" class="social-link" title="Website">
            🌐
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
  padding: 3rem 0 1.5rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2.5rem;
  margin-bottom: 2.5rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.logo-icon {
  font-size: 2rem;
}

.footer-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.footer-badges {
  display: flex;
  gap: 1rem;
}

.footer-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: white;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-copyright {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.footer-copyright p {
  margin: 0.25rem 0;
}

.footer-copyright a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
}

.footer-copyright a:hover {
  color: white;
}

.footer-social {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  text-decoration: none;
  font-size: 1.25rem;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .footer {
    padding: 3rem 0 1.5rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
}
</style>

