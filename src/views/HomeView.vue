<template>
  <div class="home-page">
    <HeroSection 
      name="Mr. Warat Supaporn"
      subtitle="I am ordinary developer"
      biography="Work for money and design for love!
I'm Warat Supaporn, an Software Developer"
      location="Thailand"
      email="nuk.warat@gmail.com"
      phone="+66 652 352 3666"
      :services="['Website Design', 'Web Application', 'Fix Bug']"
      profileImage="/sanookdev.png"
      :stats="[
        { label: 'YEARS OF\nEXPERIENCE', value: '6+' },
        { label: 'FIXED BUG', value: '+30' },
        { label: 'PROJECTS DONE', value: '+20' }
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
      title="Know me more"
      :paragraphs="[
        'I\'m a Software Developer at the Faculty of Medicine, Thammasat University (Educational Technology). My role involves collaborating with staff to turn their requirements into functional web applications, choosing the right tech stack for each system. When I\'m not coding',
        'My favourite hobbies is Playing Basketball 🏀 and I have cats 🐈'
      ]"
      :skills="[
        { name: 'Fullstack Developer', level: 100 }
      ]"
      image="/about.jpg"
      :yearsExperience="8"
    />

    <ContactSection 
      email="hello@brunoerdison.com"
      phone="+68 3568 89 86"
      location="Warsaw, Poland"
      :socials="[
        { name: 'LinkedIn', url: 'https://linkedin.com' },
        { name: 'GitHub', url: 'https://github.com' }
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
