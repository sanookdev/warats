<template>
  <div class="home-page">
    <HeroSection
      name="Mr. Warat Supaporn"
      subtitle="Fullstack Developer"
      biography="โปรแกรมเมอร์ร้อนเงิน หาเงินเลี้ยงแมว !!!"
      location="Pathum Thani, Thailand"
      email="sanooker.warats@gmail.com"
      :services="['Website Design', 'Web Application', 'Fix Bug']"
      profileImage="/profile-1-Photoroom.png"
      :stats="[
        { label: 'BASKETBALL', value: '' },
        { label: 'PLAY WITH CATS', value: '' },
        { label: 'TRAVEL', value: '' },
      ]"
      :clients="[{ name: 'email' }, { name: 'github' }]"
    />

    <!-- <BlogsSection /> -->

    <!-- <WorksSection 
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
    /> -->

    <!-- <AboutSection 
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
    /> -->

    <!-- <ContactSection 
      email="sanooker.warats@gmail.com"
      phone="0653523666"
      location="Pathum Thani, Thailand"
      :socials="[
         { name: 'Github', url: 'https://github.com/sanookdev' },
         { name: 'Email', url: 'mailto:sanooker.warats@gmail.com' }
      ]"
    /> -->
  </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import BlogsSection from "@/components/BlogsSection.vue";
import WorksSection from "@/components/WorksSection.vue";
import AboutSection from "@/components/AboutSection.vue";
import ContactSection from "@/components/ContactSection.vue";

export default {
  name: "HomeView",
  components: {
    HeroSection,
    BlogsSection,
    WorksSection,
    AboutSection,
    ContactSection,
  },
};
</script>

<style scoped>
.home-page {
  width: 100%;
}
</style>
