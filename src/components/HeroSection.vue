<template>
  <section class="hero">
    <div class="hero__container container">
      <div class="hero__title animate-fadeInDown">
        <h1>{{ name }}</h1>
        <h2>{{ subtitle }}</h2>
      </div>

      <div class="hero__content">
        <div class="hero__left">
          <div class="hero__section animate-fadeInLeft">
            <span class="hero__label">About</span>
            <p class="hero__bio">{{ biography }}</p>
          </div>

          <div class="hero__section animate-fadeInLeft">
            <span class="hero__label">CONTACT</span>
            <div class="hero__contact">
              <div class="hero__social-secondary">
                <a href="mailto:nuk.warat@gmail.com" class="hero__link-item">
                  nuk.warat@gmail.com
                </a>
                <a
                  href="https://github.com/sanookdev"
                  target="_blank"
                  class="hero__link-item"
                >
                  github.com/sanookdev
                </a>
              </div>

              <div class="hero__actions">
                <a
                  href="https://warat-supaporn.vercel.app"
                  target="_blank"
                  class="hero__cta"
                >
                  <span class="hero__cta-text">Know me more</span>
                  <div class="hero__cta-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                    >
                      <path d="M5 12h14m-7-7l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="hero__center animate-scaleIn">
          <div class="hero__image-wrapper">
            <img :src="profileImage" :alt="name" class="hero__image" />
          </div>
        </div>

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
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
  props: {
    name: { type: String, default: "Warat Supaporn" },
    subtitle: {
      type: String,
      default: "UI/UX Interaction Designer\nBased in Poland",
    },
    biography: { type: String, default: "หาเงินเลี้ยงแมวครับ" },
    profileImage: { type: String, default: "/sanookdev.png" },
    stats: {
      type: Array,
      default: () => [
        { label: "YEARS OF\nEXPERIENCE", value: "8" },
        { label: "SATISFACTION\nCLIENTS", value: "100%" },
        { label: "CLIENTS ON\nWORLDWIDE", value: "+80" },
        { label: "PROJECTS DONE", value: "675" },
      ],
    },
  },
};
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

/* --- Contact & CTA Styles --- */
.hero__contact {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero__social-secondary {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.hero__link-item {
  font-size: 14px;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;
  width: fit-content;
}
.hero__link-item:hover {
  color: var(--color-text);
  transform: translateX(4px);
}

/* The Highlighted Button */
.hero__cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 14px 28px;
  background-color: var(--color-text); /* ใช้ตัวแปรสีตาม Theme */
  color: var(--color-bg); /* ใช้ตัวแปรสีตาม Theme */
  border-radius: 100px;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.hero__cta-icon svg {
  width: 18px;
  height: 18px;
  transition: transform 0.4s ease;
}

.hero__cta:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  /* ลบ background-color: #000; ออกแล้ว เพื่อให้ใช้สีจาก var(--color-text) เหมือนเดิม */
}

.hero__cta:hover .hero__cta-icon {
  transform: translateX(5px);
}

/* Shine Animation */
.hero__cta::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    /* สีขาวจางๆ สำหรับ Shine */ transparent
  );
  transition: all 0.6s;
}

.hero__cta:hover::before {
  left: 100%;
}

/* --- Stats & Image --- */
.hero__center {
  display: flex;
  justify-content: center;
}
.hero__image-wrapper {
  position: relative;
  width: 100%;
  max-width: 420px;
  aspect-ratio: 3/4;
  border-radius: 200px;
  overflow: hidden;
  background: var(--color-gray-200);
  transition: all var(--transition-slow);
}
.hero__image-wrapper:hover {
  transform: scale(1.02) translateY(-8px);
  box-shadow: var(--shadow-xl);
}
.hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__right {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: flex-end;
  text-align: right;
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
  color: var(--color-text);
}

/* Responsive */
@media (max-width: 992px) {
  .hero__content {
    grid-template-columns: 1fr;
    text-align: center;
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
    flex-direction: row;
    justify-content: center;
  }
  .hero__social-secondary {
    align-items: center;
  }
  .hero__link-item:hover {
    transform: translateY(-2px);
  }
}
</style>
