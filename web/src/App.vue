<template>
  <div id="app">
    <Navigation />
    <Hero />
    <Features />
    <Servers />
    <TechStack />
    <Architecture />
    <Contributing />
    <Footer />
  </div>
</template>

<script setup>
import Navigation from './components/Navigation.vue'
import Hero from './components/Hero.vue'
import Features from './components/Features.vue'
import Servers from './components/Servers.vue'
import TechStack from './components/TechStack.vue'
import Architecture from './components/Architecture.vue'
import Contributing from './components/Contributing.vue'
import Footer from './components/Footer.vue'
</script>

<style scoped>
#app {
  min-height: 100vh;
}
</style>

