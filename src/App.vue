<template>
  <div id="app" class="app">
    <AppHeader />
    
    <main class="main">
      <RouterView />
    </main>
    
    <AppFooter 
      name="Warat Supaporn"
      email="nuk.warat@gmail.com"
      phone="0653523666"
    />

    <ThemeToggle />
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

export default {
  name: 'App',
  components: {
    RouterView,
    AppHeader,
    AppFooter,
    ThemeToggle
  }
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
}
</style>

