<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container">
      <div class="nav-content">
        <div class="logo">
          <span class="logo-icon">🚀</span>
          <span class="logo-text">MCP-Handle</span>
        </div>
        
        <div class="nav-links" :class="{ active: menuOpen }">
          <a href="#features" @click="closeMenu">核心功能</a>
          <a href="#servers" @click="closeMenu">MCP 服务器</a>
          <a href="#tech-stack" @click="closeMenu">技术栈</a>
          <a href="#architecture" @click="closeMenu">架构</a>
          <a href="#contributing" @click="closeMenu">贡献指南</a>
          <a href="https://github.com/WeatherPal-AI/MCP-handle" target="_blank" class="btn btn-primary btn-sm">
            GitHub
          </a>
        </div>

        <button class="menu-toggle" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const menuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  border-bottom: 1px solid transparent;
}

.navbar.scrolled {
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  border-bottom-color: var(--border-color);
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-dark);
  text-decoration: none;
}

.logo-icon {
  font-size: 2rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links a {
  color: var(--text-dark);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.nav-links a:not(.btn):hover {
  color: var(--primary-color);
}

.nav-links a:not(.btn)::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-color);
  transition: width 0.3s ease;
}

.nav-links a:not(.btn):hover::after {
  width: 100%;
}

.btn-sm {
  padding: 8px 20px;
  font-size: 0.9rem;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.menu-toggle span {
  width: 25px;
  height: 3px;
  background: var(--text-dark);
  border-radius: 3px;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-120%);
    transition: transform 0.3s ease;
    gap: 1.5rem;
  }

  .nav-links.active {
    transform: translateY(0);
  }

  .menu-toggle {
    display: flex;
  }
}
</style>

