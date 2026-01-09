<template>
  <div class="home-page">
    <HeroSection 
      name="Warat Supaporn"
      subtitle="UI/UX Interaction Designer
Based in Poland"
      biography="Work for money and design for love!
I'm Bruno, an UI/UX Interaction Designer based in Poland"
      location="Warsaw, Poland"
      email="hello@brunoerdison.com"
      phone="+68 3568 89 86"
      :services="['Website Design', 'Mobile Application Design', 'Animation']"
      profileImage="/profile.jpg"
      :stats="[
        { label: 'YEARS OF\nEXPERIENCE', value: '8' },
        { label: 'SATISFACTION\nCLIENTS', value: '100%' },
        { label: 'CLIENTS ON\nWORLDWIDE', value: '+80' },
        { label: 'PROJECTS DONE', value: '675' }
      ]"
      :clients="[
        { name: 'BLB' },
        { name: 'christopher willis' },
        { name: 'SERENITY' },
        { name: 'ARTCHIVE' },
        { name: 'CREATIVE' }
      ]"
    />

    <WorksSection 
      :works="[
        {
          id: 1,
          title: 'Brand Identity Design',
          category: 'Branding',
          description: 'Complete brand identity for a tech startup.',
          image: '/work-1.jpg'
        },
        {
          id: 2,
          title: 'E-commerce Platform',
          category: 'UI/UX Design',
          description: 'Modern shopping experience redesign',
          image: '/work-2.jpg'
        },
        {
          id: 3,
          title: 'Mobile Banking App',
          category: 'App Design',
          description: 'Intuitive mobile banking interface',
          image: '/work-3.jpg'
        }
      ]"
    />

    <AboutSection 
      title="Crafting Digital Experiences That Inspire"
      :paragraphs="[
        'I am a passionate designer and developer with a keen eye for creating beautiful, functional digital experiences.',
        'My approach combines modern aesthetics with user-centered design principles.'
      ]"
      :skills="[
        { name: 'UI/UX Design', level: 95 },
        { name: 'Frontend Dev', level: 90 },
        { name: 'Brand Identity', level: 85 },
        { name: 'Motion Design', level: 80 }
      ]"
      image="/about.jpg"
      :yearsExperience="8"
    />

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
import HeroSection from '@/components/HeroSection.vue'
import WorksSection from '@/components/WorksSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ContactSection from '@/components/ContactSection.vue'

export default {
  name: 'HomeView',
  components: {
    HeroSection,
    WorksSection,
    AboutSection,
    ContactSection
  }
}
</script>

<style scoped>
.home-page {
  width: 100%;
}
</style>
