<template>
  <Transition name="intro">
    <div v-if="visible" class="intro" aria-hidden="true">
      <div class="intro__glow"></div>
      <div class="intro__content">
        <div class="intro__name-wrap">
          <span class="intro__name">{{ name }}</span>
        </div>
        <span class="intro__role">{{ role }}</span>
        <div class="intro__line"><span class="intro__line-fill"></span></div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "IntroLoader",
  props: {
    name: { type: String, default: "Warat Supaporn" },
    role: { type: String, default: "Fullstack Developer" },
    duration: { type: Number, default: 2600 },
    once: { type: Boolean, default: true },
  },
  data() {
    return {
      visible: true,
      exitTimeout: null,
    };
  },
  mounted() {
    if (this.once && sessionStorage.getItem("introShown")) {
      this.visible = false;
      return;
    }
    document.body.style.overflow = "hidden";
    this.exitTimeout = setTimeout(() => {
      this.visible = false;
      document.body.style.overflow = "";
      sessionStorage.setItem("introShown", "1");
    }, this.duration);
  },
  beforeUnmount() {
    if (this.exitTimeout) clearTimeout(this.exitTimeout);
    document.body.style.overflow = "";
  },
};
</script>

<style scoped>
.intro {
  position: fixed;
  inset: 0;
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  overflow: hidden;
}

.intro__glow {
  position: absolute;
  width: 700px;
  height: 700px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.3), rgba(6, 182, 212, 0.12) 45%, transparent 65%);
  filter: blur(60px);
  animation: intro-glow 2.6s ease-in-out forwards;
}

.intro__content {
  position: relative;
  text-align: center;
  z-index: 1;
}

.intro__name-wrap {
  overflow: hidden;
  padding-bottom: 0.12em;
}

.intro__name {
  display: inline-block;
  font-family: var(--font-serif);
  font-size: clamp(34px, 6vw, 68px);
  font-weight: 400;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #f1f5f9, #93c5fd, #22d3ee, #f1f5f9);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation:
    intro-name-up 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both,
    gradient-text-flow 4s ease infinite 0.9s;
}

:root:not([data-theme="dark"]) .intro__name {
  background: linear-gradient(135deg, #1a1a1a, #2563eb, #06b6d4, #1a1a1a);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.intro__role {
  display: block;
  margin-top: 14px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  opacity: 0;
  animation: intro-fade-up 0.8s ease 0.6s both;
}

.intro__line {
  margin: 28px auto 0;
  width: 200px;
  height: 2px;
  background: rgba(96, 165, 250, 0.15);
  border-radius: 2px;
  overflow: hidden;
}

.intro__line-fill {
  display: block;
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, #3b82f6, #22d3ee);
  animation: intro-line 1.7s ease 0.4s forwards;
}

@keyframes intro-name-up {
  from { transform: translateY(110%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes intro-fade-up {
  from { transform: translateY(12px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes intro-line {
  to { width: 100%; }
}

@keyframes intro-glow {
  0% { opacity: 0; transform: scale(0.6); }
  40% { opacity: 1; }
  100% { opacity: 0.7; transform: scale(1.15); }
}

/* exit */
.intro-leave-active {
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.intro-leave-to {
  opacity: 0;
  transform: scale(1.06);
}
</style>
