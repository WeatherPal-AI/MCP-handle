<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content fade-in-up">
        <div class="hero-badge">
          🏆 企业级 MCP 工具编排解决方案
        </div>
        
        <h1 class="hero-title">
          统一的 AI Agent 工具接入层<br/>
          <span class="gradient-text">连接一切，编排智能</span>
        </h1>
        
        <p class="hero-description">
          基于 Model Context Protocol (MCP) 构建的开源生态系统。<br/>
          提供完整的基础设施、100+ 预集成服务器，以及跨平台客户端，<br/>
          让 AI 应用开发从复杂集成中解放出来。
        </p>

        <div class="hero-stats">
          <div class="stat">
            <div class="stat-number">100+</div>
            <div class="stat-label">MCP 服务器</div>
          </div>
          <div class="stat">
            <div class="stat-number">4</div>
            <div class="stat-label">客户端平台</div>
          </div>
          <div class="stat">
            <div class="stat-number">开源</div>
            <div class="stat-label">Apache 2.0</div>
          </div>
        </div>

        <div class="hero-actions">
          <a href="https://github.com/WeatherPal-AI/MCP-handle" target="_blank" class="btn btn-primary">
            🚀 立即开始
          </a>
          <a href="#features" class="btn btn-outline">
            📖 了解更多
          </a>
        </div>

        <div class="hero-code">
          <div class="code-header">
            <span class="code-dot"></span>
            <span class="code-dot"></span>
            <span class="code-dot"></span>
            <span class="code-title">快速开始</span>
          </div>
          <pre class="code-content"><code>git clone https://github.com/WeatherPal-AI/MCP-handle.git
cd MCP-handle
./scripts/start_status_service.sh</code></pre>
        </div>
      </div>
    </div>

    <div class="hero-background">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.hero {
  position: relative;
  padding: 120px 0 70px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #fff 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.hero-badge {
  display: inline-block;
  padding: 10px 24px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(139, 92, 246, 0.12));
  border: 2px solid rgba(99, 102, 241, 0.25);
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}

.hero-badge::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.hero-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.25);
  border-color: rgba(99, 102, 241, 0.4);
}

.hero-badge:hover::before {
  left: 100%;
}

.hero-title {
  font-size: 3.25rem;
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 1.25rem;
  color: var(--text-dark);
}

.gradient-text {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.125rem;
  color: var(--text-light);
  max-width: 800px;
  margin: 0 auto 2.5rem;
  line-height: 1.7;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.stat {
  text-align: center;
  padding: 1.25rem 1.75rem;
  background: white;
  border-radius: 14px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-light);
  transition: all 0.3s ease;
  min-width: 130px;
}

.stat:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(99, 102, 241, 0.3);
}

.stat-number {
  font-size: 2.75rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-medium);
  margin-top: 0.75rem;
  font-weight: 600;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.hero-code {
  max-width: 600px;
  margin: 0 auto;
  background: #1e293b;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.code-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #334155;
  border-bottom: 1px solid #475569;
}

.code-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ef4444;
}

.code-dot:nth-child(2) {
  background: #f59e0b;
}

.code-dot:nth-child(3) {
  background: #10b981;
}

.code-title {
  margin-left: auto;
  color: #94a3b8;
  font-size: 0.875rem;
}

.code-content {
  padding: 20px;
  margin: 0;
  overflow-x: auto;
}

.code-content code {
  color: #e2e8f0;
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  overflow: hidden;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.5;
  animation: float 6s ease-in-out infinite;
}

.blob-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3));
  top: -200px;
  left: -100px;
}

.blob-2 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2));
  bottom: -250px;
  right: -150px;
  animation-delay: 2s;
}

.blob-3 {
  width: 350px;
  height: 350px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.2));
  top: 50%;
  right: 10%;
  animation-delay: 4s;
}

@media (max-width: 768px) {
  .hero {
    padding: 100px 0 50px;
  }

  .hero-title {
    font-size: 1.875rem;
  }

  .hero-description {
    font-size: 0.9375rem;
  }

  .hero-stats {
    gap: 1rem;
  }

  .stat {
    padding: 1rem 1.5rem;
    min-width: 120px;
  }

  .stat-number {
    font-size: 2rem;
  }

  .hero-code {
    font-size: 0.8rem;
  }

  .blob {
    filter: blur(40px);
  }
}
</style>

