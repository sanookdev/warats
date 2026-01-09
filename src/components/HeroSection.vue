<template>
  <section class="hero">
    <div class="hero__container container">
      <!-- Main Title -->
      <div class="hero__title animate-fadeInDown">
        <h1>{{ name }}</h1>
        <h2>{{ subtitle }}</h2>
      </div>

      <!-- Content Grid -->
      <div class="hero__content">
        <!-- Left Side - Biography & Info -->
        <div class="hero__left">
          <div class="hero__section animate-fadeInLeft ">
            <span class="hero__label">BIOGRAPHY</span>
            <p class="hero__bio">{{ biography }}</p>
          </div>

          <div class="hero__section animate-fadeInLeft">
            <span class="hero__label">CONTACT</span>
            <div class="hero__contact">
              <p>{{ location }}</p>
              <p><a :href="'mailto:' + email">{{ email }}</a></p>
              <p><a :href="'tel:' + phone">{{ phone }}</a></p>
            </div>
          </div>

          <div class="hero__section animate-fadeInLeft ">
            <span class="hero__label">SERVICES</span>
            <ul class="hero__services">
              <li v-for="service in services" :key="service">{{ service }}</li>
            </ul>
          </div>
        </div>

        <!-- Center - Profile Image -->
        <div class="hero__center animate-scaleIn ">
          <div class="hero__image-wrapper">
            <img :src="profileImage" :alt="name" class="hero__image" />
          </div>
        </div>

        <!-- Right Side - Stats -->
        <div class="hero__right">
          <div 
            class="hero__stat animate-fadeInRight" 
            v-for="(stat, index) in stats" 
            :key="stat.label"
          >
            <span class="hero__stat-label">{{ stat.label }}</span>
            <span class="hero__stat-value">{{ stat.value }}</span>
          </div>
        </div>
      </div>

      <!-- Clients/Partners -->
      <div class="hero__clients animate-fadeInUp delay-500">
        <div class="hero__client" v-for="client in clients" :key="client.name">
          <span>{{ client.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  props: {
    name: {
      type: String,
      default: 'Warat Supaporn'
    },
    subtitle: {
      type: String,
      default: 'UI/UX Interaction Designer\nBased in Poland'
    },
    biography: {
      type: String,
      default: "Work for money and design for love!\nI'm Bruno, an UI/UX Interaction Designer based in Poland"
    },
    location: {
      type: String,
      default: 'Warsaw, Poland'
    },
    email: {
      type: String,
      default: 'hello@brunoerdison.com'
    },
    phone: {
      type: String,
      default: '+68 3568 89 86'
    },
    services: {
      type: Array,
      default: () => [
        'Website Design',
        'Mobile Application Design',
        'Animation'
      ]
    },
    profileImage: {
      type: String,
      default: '/sanookdev.png'
    },
    stats: {
      type: Array,
      default: () => [
        { label: 'YEARS OF\nEXPERIENCE', value: '8' },
        { label: 'SATISFACTION\nCLIENTS', value: '100%' },
        { label: 'CLIENTS ON\nWORLDWIDE', value: '+80' },
        { label: 'PROJECTS DONE', value: '675' }
      ]
    },
    clients: {
      type: Array,
      default: () => [
        { name: 'BLB' },
        { name: 'christopher willis' },
        { name: 'SERENITY' },
        { name: 'ARTCHIVE' },
        { name: 'CREATIVE' }
      ]
    }
  }
}
</script>

<style scoped>
.hero {
  min-height: 100vh;
  padding: 120px 0 60px;
  display: flex;
  align-items: center;
  background-color: var(--color-bg);
  transition: background-color var(--transition);
}

.hero__container {
  width: 100%;
}

.hero__title {
  text-align: center;
  margin-bottom: 60px;
}

.hero__title h1 {
  font-family: var(--font-serif);
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 400;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  color: var(--color-text);
}

.hero__title h2 {
  font-family: var(--font-serif);
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 400;
  color: var(--color-text-secondary);
  white-space: pre-line;
  line-height: 1.3;
}

.hero__content {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 40px;
  align-items: center;
  margin-bottom: 80px;
}

.hero__left {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.hero__section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hero__label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--color-text-muted);
  text-transform: uppercase;
}

.hero__bio {
  font-size: 14px;
  line-height: 1.7;
  color: var(--color-text-secondary);
  white-space: pre-line;
}

.hero__contact p {
  font-size: 14px;
  line-height: 1.8;
  color: var(--color-text-secondary);
}

.hero__contact a {
  transition: color var(--transition);
}

.hero__contact a:hover {
  color: var(--color-text);
}

.hero__services li {
  font-size: 14px;
  line-height: 1.8;
  color: var(--color-text-secondary);
  transition: transform var(--transition), color var(--transition);
}

.hero__services li:hover {
  transform: translateX(4px);
  color: var(--color-text);
}

.hero__center {
  display: flex;
  justify-content: center;
}

.hero__image-wrapper {
  position: relative;
  width: 100%;
  max-width: 350px;
  aspect-ratio: 3/4;
  border-radius: 200px 200px 200px 200px;
  overflow: hidden;
  background: var(--color-gray-200);
  transition: transform var(--transition-slow), box-shadow var(--transition-slow);
}

.hero__image-wrapper:hover {
  transform: scale(1.02) translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.hero__image-wrapper:hover .hero__image {
  transform: scale(1.05);
}

.hero__right {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: flex-end;
  text-align: right;
}

.hero__stat {
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform var(--transition);
}

.hero__stat:hover {
  transform: translateX(-4px);
}

.hero__stat-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--color-text-muted);
  text-transform: uppercase;
  white-space: pre-line;
}

.hero__stat-value {
  font-family: var(--font-serif);
  font-size: 32px;
  font-weight: 400;
  color: var(--color-text);
  transition: color var(--transition);
}

.hero__stat:hover .hero__stat-value {
  color: var(--color-text-secondary);
}

.hero__clients {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48px;
  padding-top: 40px;
  border-top: 1px solid var(--color-border);
}

.hero__client {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  text-transform: uppercase;
  transition: all var(--transition);
  cursor: default;
}

.hero__client:hover {
  color: var(--color-text);
  transform: scale(1.1);
}

/* Responsive */
@media (max-width: 992px) {
  .hero {
    padding: 100px 0 40px;
  }

  .hero__content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 48px;
  }

  .hero__left {
    order: 2;
    align-items: center;
  }

  .hero__center {
    order: 1;
  }

  .hero__right {
    order: 3;
    align-items: center;
    text-align: center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 32px;
  }

  .hero__stat {
    min-width: 120px;
  }

  .hero__stat:hover {
    transform: translateY(-4px);
  }

  .hero__image-wrapper {
    max-width: 280px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 90px 0 40px;
  }

  .hero__title {
    margin-bottom: 40px;
  }

  .hero__clients {
    gap: 24px;
    flex-wrap: wrap;
  }

  .hero__right {
    gap: 24px;
  }

  .hero__stat-value {
    font-size: 28px;
  }
}

@media (max-width: 576px) {
  .hero__image-wrapper {
    max-width: 220px;
  }

  .hero__clients {
    gap: 16px;
  }

  .hero__client {
    font-size: 10px;
  }

  .hero__stat {
    min-width: 100px;
  }
}
</style>
