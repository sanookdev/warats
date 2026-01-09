<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="contact-hero">
      <div class="contact-hero__container container">
        <span class="contact-hero__label animate-fadeInDown">Contact</span>
        <h1 class="contact-hero__title animate-fadeInDown delay-100">Let's Connect</h1>
        <p class="contact-hero__subtitle animate-fadeInDown delay-200">
          Have a project in mind or want to collaborate? I'd love to hear from you.
        </p>
      </div>
    </section>

    <ContactSection 
      email="hello@brunoerdison.com"
      phone="+68 3568 89 86"
      location="Warsaw, Poland"
      :socials="[
        { name: 'Twitter', url: 'https://twitter.com' },
        { name: 'LinkedIn', url: 'https://linkedin.com' },
        { name: 'GitHub', url: 'https://github.com' },
        { name: 'Dribbble', url: 'https://dribbble.com' }
      ]"
    />
  </div>
</template>

<script>
import ContactSection from '@/components/ContactSection.vue'

export default {
  name: 'ContactView',
  components: {
    ContactSection
  }
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  background-color: var(--color-bg);
  transition: background-color var(--transition);
}

.contact-hero {
  padding: 140px 0 60px;
  text-align: center;
  background-color: var(--color-bg-secondary);
  transition: background-color var(--transition);
}

.contact-hero__label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.contact-hero__title {
  font-family: var(--font-serif);
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 400;
  margin-top: 16px;
  color: var(--color-text);
}

.contact-hero__subtitle {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin-top: 16px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 768px) {
  .contact-hero {
    padding: 120px 0 40px;
  }
}
</style>
