<template>
  <div id="app" class="app">
    <IntroLoader name="Warat Supaporn" role="Fullstack Developer" />
    <CustomCursor />

    <AppHeader />

    <main class="main">
      <RouterView />
    </main>

    <AppFooter
      name="Warat Supaporn"
      email="nuk.warat@gmail.com"
    />

    <ThemeToggle />
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import IntroLoader from '@/components/IntroLoader.vue'
import CustomCursor from '@/components/CustomCursor.vue'

export default {
  name: 'App',
  components: {
    RouterView,
    AppHeader,
    AppFooter,
    ThemeToggle,
    IntroLoader,
    CustomCursor
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

