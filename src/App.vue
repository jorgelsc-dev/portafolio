<template>
  <a class="skip-link" href="#main">Saltar al contenido</a>

  <v-app>
    <v-app-bar elevation="0" class="app-bar" height="72">
      <v-container class="d-flex align-center justify-space-between">
        <div class="brand" role="banner" aria-label="Marca">
          <span class="brand-mark" aria-hidden="true" />
          <span class="brand-text">{{ profile.shortName }}</span>
        </div>

        <div class="nav-desktop" aria-label="Navegación principal">
          <v-btn
            v-for="item in navDesktop"
            :key="item.id"
            variant="text"
            class="nav-btn"
            :class="{ 'is-active': activeSection === item.id }"
            @click="scrollTo(item.id)"
          >
            {{ item.label }}
          </v-btn>
          <v-btn
            icon
            variant="text"
            class="theme-btn"
            :aria-label="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
            @click="toggleTheme"
          >
            <v-icon :icon="isDark ? 'mdi-weather-sunny' : 'mdi-moon-waning-crescent'" />
          </v-btn>
          <v-btn class="cta-btn" color="primary" variant="flat" rounded="lg" @click="scrollTo('contacto')">
            Contacto
          </v-btn>
        </div>

        <div class="nav-mobile">
          <v-btn icon variant="text" :aria-label="drawer ? 'Cerrar menú' : 'Abrir menú'" @click="drawer = !drawer">
            <v-icon :icon="drawer ? 'mdi-close' : 'mdi-menu'" />
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" location="right" temporary width="320" class="drawer">
      <v-list density="comfortable">
        <v-list-item v-for="item in nav" :key="item.id" :title="item.label" @click="scrollTo(item.id)" />
        <v-divider class="my-2" />
        <v-list-item title="Cambiar tema" @click="toggleTheme">
          <template #prepend>
            <v-icon :icon="isDark ? 'mdi-weather-sunny' : 'mdi-moon-waning-crescent'" />
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main id="main">
      <section id="inicio" class="section hero" aria-label="Inicio">
        <div class="hero-bg" aria-hidden="true" />

        <v-container class="py-16">
          <v-row align="center">
            <v-col cols="12" md="7">
              <p class="eyebrow">{{ profile.kicker }}</p>
              <h1 class="hero-title">{{ profile.name }}</h1>
              <p class="hero-subtitle">{{ profile.headline }}</p>

              <div class="hero-actions">
                <v-btn color="primary" variant="flat" rounded="lg" size="large" @click="scrollTo('proyectos')">
                  Ver proyectos
                  <v-icon end icon="mdi-arrow-right" />
                </v-btn>
                <v-btn variant="tonal" rounded="lg" size="large" @click="scrollTo('sobre-mi')">Sobre mí</v-btn>
              </div>

              <div class="hero-badges" aria-label="Enfoques">
                <span class="badge"><v-icon icon="mdi-speedometer" size="18" /><span>Performance</span></span>
                <span class="badge"><v-icon icon="mdi-search-web" size="18" /><span>SEO</span></span>
                <span class="badge"><v-icon icon="mdi-accessibility" size="18" /><span>Accesibilidad</span></span>
              </div>
            </v-col>

            <v-col cols="12" md="5">
              <v-card class="glass" rounded="xl" elevation="0">
                <v-card-title class="text-h6">Stack principal</v-card-title>
                <v-card-text>
                  <div class="chips" aria-label="Tecnologías destacadas">
                    <v-chip v-for="s in featuredSkills" :key="s" color="secondary" variant="tonal" class="ma-1">
                      {{ s }}
                    </v-chip>
                  </div>

                  <div class="mini-grid" aria-label="Enfoques de trabajo">
                    <div class="mini-item"><div class="mini-k">Enfoque</div><div class="mini-v">UI + DX</div></div>
                    <div class="mini-item"><div class="mini-k">Entrega</div><div class="mini-v">Calidad</div></div>
                    <div class="mini-item"><div class="mini-k">Código</div><div class="mini-v">Limpio</div></div>
                    <div class="mini-item"><div class="mini-k">Diseño</div><div class="mini-v">Cuidado</div></div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <section id="sobre-mi" class="section" aria-label="Sobre mí">
        <v-container class="py-16">
          <div class="section-head">
            <h2 class="section-title">Sobre mí</h2>
            <p class="section-desc">
              Trabajo desde la idea hasta la implementación, cuidando performance, semántica y detalles visuales.
            </p>
          </div>

          <v-row class="mt-8" align="stretch">
            <v-col cols="12" md="7">
              <v-card class="glass" rounded="xl" elevation="0">
                <v-card-text class="prose">
                  <p>
                    Soy <strong>{{ profile.name }}</strong>, desarrollador enfocado en crear productos web que se sientan
                    rápidos y sólidos. Me gusta diseñar sistemas de UI consistentes, y mantener el código simple,
                    testeable y fácil de extender.
                  </p>
                  <p>
                    Este portafolio está hecho con <strong>Vue 3 + Vuetify</strong> y está optimizado para SEO
                    (metadatos, Open Graph, JSON-LD, sitemap y robots).
                  </p>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="5">
              <v-card class="glass" rounded="xl" elevation="0">
                <v-card-title class="text-h6">Detalles rápidos</v-card-title>
                <v-card-text>
                  <ul class="facts">
                    <li><v-icon icon="mdi-map-marker" size="18" /><span>{{ profile.location }}</span></li>
                    <li><v-icon icon="mdi-translate" size="18" /><span>Español / Inglés</span></li>
                    <li><v-icon icon="mdi-rocket-launch" size="18" /><span>Disponible para proyectos</span></li>
                  </ul>

                  <div class="mt-4">
                    <v-btn variant="tonal" color="primary" rounded="lg" @click="copyEmail">
                      <v-icon start icon="mdi-content-copy" />
                      Copiar email
                    </v-btn>
                    <p class="hint" v-if="copied">Copiado.</p>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <section id="skills" class="section" aria-label="Skills">
        <v-container class="py-16">
          <div class="section-head">
            <h2 class="section-title">Skills</h2>
            <p class="section-desc">Tecnologías con las que trabajo regularmente.</p>
          </div>

          <v-row class="mt-8">
            <v-col cols="12" md="6" lg="4" v-for="group in skills" :key="group.title">
              <v-card class="glass" rounded="xl" elevation="0">
                <v-card-title class="text-h6">{{ group.title }}</v-card-title>
                <v-card-text>
                  <div class="chips">
                    <v-chip v-for="item in group.items" :key="item" variant="tonal" color="primary" class="ma-1">
                      {{ item }}
                    </v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <section id="proyectos" class="section" aria-label="Proyectos">
        <v-container class="py-16">
          <div class="section-head">
            <h2 class="section-title">Proyectos</h2>
            <p class="section-desc">Una muestra de lo que puedo construir. Reemplaza los links por tus repos/demos reales.</p>
          </div>

          <v-row class="mt-8">
            <v-col cols="12" md="6" lg="4" v-for="p in projects" :key="p.title">
              <v-card class="glass project" rounded="xl" elevation="0">
                <div class="project-top">
                  <div class="project-badge" v-if="p.featured">Destacado</div>
                  <h3 class="project-title">{{ p.title }}</h3>
                  <p class="project-desc">{{ p.description }}</p>
                </div>
                <v-card-text>
                  <div class="chips">
                    <v-chip v-for="t in p.stack" :key="t" size="small" variant="tonal" color="secondary" class="ma-1">
                      {{ t }}
                    </v-chip>
                  </div>
                </v-card-text>
                <v-card-actions class="px-4 pb-4">
                  <v-btn :href="p.demo" target="_blank" rel="noopener" variant="tonal" color="primary" :disabled="!p.demo">
                    Demo
                  </v-btn>
                  <v-btn :href="p.code" target="_blank" rel="noopener" variant="text" :disabled="!p.code">Código</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <section id="contacto" class="section" aria-label="Contacto">
        <v-container class="py-16">
          <div class="section-head">
            <h2 class="section-title">Contacto</h2>
            <p class="section-desc">Si tienes una idea o necesitas apoyo en un proyecto, hablemos.</p>
          </div>

          <v-row class="mt-8" align="stretch">
            <v-col cols="12" md="7">
              <v-card class="glass" rounded="xl" elevation="0">
                <v-card-text class="prose">
                  <p><strong>Email:</strong> <a :href="'mailto:' + profile.email">{{ profile.email }}</a></p>
                  <p><strong>Dominio:</strong> <a href="https://jorgelsc.dev/" rel="noopener">jorgelsc.dev</a></p>
                  <div class="contact-actions">
                    <v-btn color="primary" variant="flat" rounded="lg" :href="'mailto:' + profile.email">
                      <v-icon start icon="mdi-email-outline" />
                      Enviar email
                    </v-btn>
                    <v-btn variant="tonal" rounded="lg" :href="profile.github" target="_blank" rel="noopener" :disabled="!profile.github">
                      <v-icon start icon="mdi-github" />
                      GitHub
                    </v-btn>
                    <v-btn
                      variant="tonal"
                      rounded="lg"
                      :href="profile.linkedin"
                      target="_blank"
                      rel="noopener"
                      :disabled="!profile.linkedin"
                    >
                      <v-icon start icon="mdi-linkedin" />
                      LinkedIn
                    </v-btn>
                  </div>
                  <p class="hint">Edita tus links en <code>src/App.vue</code>.</p>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="5">
              <v-card class="glass" rounded="xl" elevation="0">
                <v-card-title class="text-h6">Checklist SEO</v-card-title>
                <v-card-text>
                  <ul class="facts">
                    <li><v-icon icon="mdi-check-circle-outline" size="18" /><span>Meta tags + canonical</span></li>
                    <li><v-icon icon="mdi-check-circle-outline" size="18" /><span>Open Graph + Twitter</span></li>
                    <li><v-icon icon="mdi-check-circle-outline" size="18" /><span>JSON-LD (schema.org)</span></li>
                    <li><v-icon icon="mdi-check-circle-outline" size="18" /><span>Sitemap + robots</span></li>
                  </ul>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <v-container class="pb-10">
        <footer class="footer">
          <span>© {{ year }} {{ profile.shortName }}.</span>
          <span class="sep" aria-hidden="true">•</span>
          <a href="#inicio" @click.prevent="scrollTo('inicio')">Arriba</a>
        </footer>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed, inject, onMounted, ref } from "vue";
import { useTheme } from "vuetify";

const STORAGE_THEME_KEY = inject("storageThemeKey", "jorgelsc:theme");
const setThemeColorMeta = inject("setThemeColorMeta", () => {});

const profile = {
  name: "Jorge Luis Sánchez Casanova",
  shortName: "Jorge LSC",
  kicker: "Frontend Developer",
  headline: "Construyo experiencias web rápidas, accesibles y con diseño cuidado.",
  location: "Remoto (LatAm)",
  email: "hola@jorgelsc.dev",
  github: "",
  linkedin: ""
};

const nav = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "skills", label: "Skills" },
  { id: "proyectos", label: "Proyectos" },
  { id: "contacto", label: "Contacto" }
];

const navDesktop = nav.filter((i) => i.id !== "contacto");

const featuredSkills = ["Vue 3", "Vuetify", "TypeScript", "Vite", "Node.js", "SEO"];

const skills = [
  { title: "Frontend", items: ["Vue 3", "Vuetify", "TypeScript", "JavaScript", "HTML", "CSS"] },
  { title: "Backend", items: ["Node.js", "REST APIs", "Auth", "SQL (básico)"] },
  { title: "Tooling", items: ["Git", "Docker", "CI/CD", "Testing", "Linux"] }
];

const projects = [
  {
    featured: true,
    title: "Landing + SEO técnico",
    description: "Sitio estático con meta tags, Open Graph, JSON-LD y buenas prácticas de performance.",
    stack: ["Vue 3", "Vuetify", "SEO"],
    demo: "",
    code: ""
  },
  {
    featured: false,
    title: "Dashboard de analítica",
    description: "UI con componentes reutilizables, estados claros y gráficas integradas.",
    stack: ["Vue", "Charts", "API"],
    demo: "",
    code: ""
  },
  {
    featured: false,
    title: "Sistema de administración",
    description: "Panel con roles, CRUD, validaciones y experiencia consistente en desktop y mobile.",
    stack: ["Vuetify", "Auth", "DX"],
    demo: "",
    code: ""
  }
];

const drawer = ref(false);
const activeSection = ref("inicio");
const copied = ref(false);
const year = new Date().getFullYear();

function prefersReducedMotion() {
  return Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

function scrollTo(id) {
  drawer.value = false;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  if (history.replaceState) history.replaceState(null, "", `#${id}`);
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email);
    copied.value = true;
    window.setTimeout(() => {
      copied.value = false;
    }, 1400);
  } catch {
    window.location.href = `mailto:${profile.email}`;
  }
}

const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark);

function toggleTheme() {
  const next = isDark.value ? "light" : "dark";
  theme.global.name.value = next;
  localStorage.setItem(STORAGE_THEME_KEY, next);
  setThemeColorMeta(next);
}

onMounted(() => {
  const targets = nav.map((n) => document.getElementById(n.id)).filter(Boolean);
  const io = new IntersectionObserver(
    (entries) => {
      let best = null;
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
      }
      if (best && best.target && best.target.id) activeSection.value = best.target.id;
    },
    { threshold: [0.2, 0.35, 0.5, 0.65], rootMargin: "-25% 0px -60% 0px" }
  );
  for (const t of targets) io.observe(t);
});
</script>

