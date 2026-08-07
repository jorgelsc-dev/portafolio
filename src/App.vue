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
            <v-icon :icon="isDark ? '$weatherSunny' : '$moonWaningCrescent'" />
          </v-btn>
          <v-btn class="cta-btn" color="primary" variant="flat" rounded="lg" @click="scrollTo('contacto')">
            Contacto
          </v-btn>
        </div>

        <div class="nav-mobile">
          <v-btn icon variant="text" :aria-label="drawer ? 'Cerrar menú' : 'Abrir menú'" @click="drawer = !drawer">
            <v-icon :icon="drawer ? '$close' : '$menu'" />
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
            <v-icon :icon="isDark ? '$weatherSunny' : '$moonWaningCrescent'" />
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main id="main">
      <section id="inicio" class="section hero" aria-label="Inicio">
        <div class="hero-bg" aria-hidden="true" />

        <v-container class="py-16">
          <v-row align="center" class="hero-layout">
            <v-col cols="12" md="7">
              <p class="eyebrow">{{ profile.kicker }}</p>
              <h1 class="hero-title">{{ profile.name }}</h1>
              <p class="hero-subtitle">{{ profile.headline }}</p>

              <div class="hero-actions">
                <v-btn color="primary" variant="flat" rounded="lg" size="large" @click="scrollTo('experiencia')">
                  Ver experiencia
                  <v-icon end icon="$arrowRight" />
                </v-btn>
                <v-btn variant="tonal" rounded="lg" size="large" :href="profile.cvDevOpsEs" target="_blank" rel="noopener">
                  <v-icon start icon="$fileDocumentOutline" />
                  CV DevOps ES
                </v-btn>
                <v-btn variant="text" rounded="lg" size="large" :href="profile.cvDevOpsPt" target="_blank" rel="noopener">
                  CV DevOps PT
                </v-btn>
              </div>

              <div class="hero-badges" aria-label="Especialidades">
                <span v-for="badge in heroBadges" :key="badge.label" class="badge">
                  <v-icon :icon="badge.icon" size="18" />
                  <span>{{ badge.label }}</span>
                </span>
              </div>
            </v-col>

            <v-col cols="12" md="5">
              <v-card class="glass profile-panel" rounded="xl" elevation="0">
                <div class="portrait-wrap">
                  <img class="portrait" :src="profile.photo" :alt="`Foto profesional de ${profile.name}`" />
                  <div>
                    <p class="portrait-kicker">Disponible remoto / internacional</p>
                    <p class="portrait-title">Tech Lead DevSecOps</p>
                  </div>
                </div>
                <v-card-title class="text-h6">Perfil ejecutivo</v-card-title>
                <v-card-text>
                  <div class="impact-strip" aria-label="Logros destacados">
                    <div v-for="item in impactMetrics" :key="item.value" class="impact-item">
                      <strong>{{ item.value }}</strong>
                      <span>{{ item.label }}</span>
                    </div>
                  </div>

                  <div class="chips" aria-label="Tecnologías destacadas">
                    <v-chip v-for="s in featuredSkills" :key="s" color="secondary" variant="tonal" class="ma-1">
                      {{ s }}
                    </v-chip>
                  </div>

                  <div class="mini-grid" aria-label="Enfoques de trabajo">
                    <div v-for="item in operatingModel" :key="item.k" class="mini-item">
                      <div class="mini-k">{{ item.k }}</div>
                      <div class="mini-v">{{ item.v }}</div>
                    </div>
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
              Ingeniero en Ciencias Informáticas con una combinación fuerte de liderazgo técnico, seguridad ofensiva y defensiva,
              operaciones SOC/CERT y entrega de plataformas en producción.
            </p>
          </div>

          <v-row class="mt-8" align="stretch">
            <v-col cols="12" md="7">
              <v-card class="glass" rounded="xl" elevation="0">
                <v-card-text class="prose">
                  <p>
                    Soy <strong>{{ profile.name }}</strong>, Tech Lead y DevSecOps con más de 6 años uniendo
                    ciberseguridad, automatización de infraestructura y entrega de software.
                  </p>
                  <p>
                    He liderado decisiones técnicas y despliegues en producción sobre AWS, Kubernetes y Linux. Mi
                    enfoque combina respuesta a incidentes, hardening, SIEM y automatización con CI/CD para reducir
                    riesgos operativos y mejorar continuidad de negocio.
                  </p>
                  <p>
                    Busco integrarme en equipos multidisciplinarios donde pueda aportar liderazgo técnico, cultura
                    DevSecOps y mejora continua.
                  </p>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="5">
              <v-card class="glass" rounded="xl" elevation="0">
                <v-card-title class="text-h6">Detalles rápidos</v-card-title>
                <v-card-text>
                  <ul class="facts">
                    <li><v-icon icon="$mapMarker" size="18" /><span>{{ profile.location }}</span></li>
                    <li><v-icon icon="$translate" size="18" /><span>{{ profile.languagesSummary }}</span></li>
                    <li><v-icon icon="$briefcaseCheckOutline" size="18" /><span>{{ profile.availability }}</span></li>
                    <li><v-icon icon="$airplaneTakeoff" size="18" /><span>{{ profile.relocation }}</span></li>
                  </ul>

                  <div class="mt-4">
                    <v-btn variant="tonal" color="primary" rounded="lg" @click="copyEmail">
                      <v-icon start icon="$contentCopy" />
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

      <section id="experiencia" class="section" aria-label="Experiencia">
        <v-container class="py-16">
          <div class="section-head">
            <h2 class="section-title">Experiencia</h2>
            <p class="section-desc">
              Trayectoria reciente como Tech Lead, DevOps y ciberseguridad aplicada a plataformas de misión crítica.
            </p>
          </div>

          <v-row class="mt-8" align="stretch">
            <v-col cols="12" md="6" v-for="item in experience" :key="`${item.role}-${item.company}`">
              <v-card class="glass exp-card" rounded="xl" elevation="0">
                <v-card-text>
                  <div class="exp-head">
                    <p class="exp-period">{{ item.period }}</p>
                    <p class="exp-company">{{ item.company }}</p>
                  </div>
                  <h3 class="project-title">{{ item.role }}</h3>
                  <ul class="exp-list">
                    <li v-for="point in item.highlights" :key="point">{{ point }}</li>
                  </ul>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <section id="logros" class="section" aria-label="Logros medibles">
        <v-container class="py-16">
          <div class="section-head">
            <h2 class="section-title">Logros medibles</h2>
            <p class="section-desc">
              Señales concretas para reclutadores, ATS y evaluadores técnicos: impacto operativo, seguridad y liderazgo.
            </p>
          </div>

          <v-row class="mt-8" align="stretch">
            <v-col cols="12" sm="6" lg="3" v-for="item in achievementCards" :key="item.title">
              <v-card class="glass achievement-card" rounded="xl" elevation="0">
                <v-card-text>
                  <p class="achievement-value">{{ item.value }}</p>
                  <h3 class="achievement-title">{{ item.title }}</h3>
                  <p class="achievement-desc">{{ item.description }}</p>
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
            <p class="section-desc">Tecnologías y herramientas que aplico en operaciones y despliegues reales.</p>
          </div>

          <v-row class="mt-8">
            <v-col cols="12" md="6" lg="6" v-for="group in skills" :key="group.title">
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

      <section id="cv" class="section" aria-label="Curriculum Vitae">
        <v-container class="py-16">
          <div class="section-head">
            <h2 class="section-title">CV por objetivo</h2>
            <p class="section-desc">
              Versiones listas para ATS, reclutamiento internacional y lectura ejecutiva en español y portugués de Brasil.
            </p>
          </div>

          <v-row class="mt-8" align="stretch">
            <v-col cols="12" sm="6" lg="3" v-for="cv in cvDownloads" :key="cv.title">
              <v-card class="glass cv-card" rounded="xl" elevation="0">
                <v-card-text>
                  <p class="cv-tag">{{ cv.tag }}</p>
                  <h3 class="cv-title">{{ cv.title }}</h3>
                  <p class="cv-desc">{{ cv.description }}</p>
                  <div class="cv-actions">
                    <v-btn :href="cv.es" target="_blank" rel="noopener" color="primary" variant="tonal" rounded="lg" size="small">
                      ES
                    </v-btn>
                    <v-btn :href="cv.pt" target="_blank" rel="noopener" variant="text" rounded="lg" size="small">
                      PT-BR
                    </v-btn>
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
            <h2 class="section-title">Proyectos y paquetes</h2>
            <p class="section-desc">
              Paquetes publicados en PyPI y proyectos aplicados a ciberseguridad, detección temprana y automatización operativa.
            </p>
          </div>

          <div class="section-subhead mt-8">
            <h3 class="section-subtitle">Paquetes en PyPI</h3>
            <p class="section-mini-desc">Publicaciones activas con versión, requisitos, instalación y enlaces oficiales.</p>
          </div>

          <v-row class="mt-4">
            <v-col cols="12" md="6" v-for="pkg in pypiPackages" :key="pkg.title">
              <v-card class="glass project" rounded="xl" elevation="0">
                <div class="project-top">
                  <div class="project-badge">{{ pkg.badge }}</div>
                  <h3 class="project-title">{{ pkg.title }}</h3>
                  <p class="project-desc">{{ pkg.description }}</p>
                  <p class="project-meta">{{ pkg.release }}</p>
                </div>
                <v-card-text>
                  <p class="project-install"><code>{{ pkg.install }}</code></p>
                  <ul class="project-list">
                    <li v-for="point in pkg.highlights" :key="point">{{ point }}</li>
                  </ul>
                  <div class="chips">
                    <v-chip v-for="t in pkg.stack" :key="t" size="small" variant="tonal" color="secondary" class="ma-1">
                      {{ t }}
                    </v-chip>
                  </div>
                </v-card-text>
                <v-card-actions class="px-4 pb-4 project-actions">
                  <v-btn :href="pkg.pypi" target="_blank" rel="noopener" variant="tonal" color="primary">PyPI</v-btn>
                  <v-btn v-if="pkg.docs" :href="pkg.docs" target="_blank" rel="noopener" variant="text">Docs</v-btn>
                  <v-btn v-if="pkg.code" :href="pkg.code" target="_blank" rel="noopener" variant="text">Repositorio</v-btn>
                  <v-btn v-if="pkg.issues" :href="pkg.issues" target="_blank" rel="noopener" variant="text">Issues</v-btn>
                  <v-btn v-if="pkg.changelog" :href="pkg.changelog" target="_blank" rel="noopener" variant="text">Changelog</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <div class="section-subhead mt-10">
            <h3 class="section-subtitle">Otros proyectos aplicados</h3>
            <p class="section-mini-desc">Implementaciones orientadas a detección, análisis y respuesta en entornos reales.</p>
          </div>

          <v-row class="mt-4">
            <v-col cols="12" md="6" v-for="p in projects" :key="p.title">
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
                  <v-btn v-if="p.demo" :href="p.demo" target="_blank" rel="noopener" variant="tonal" color="primary">
                    Caso de estudio
                  </v-btn>
                  <v-btn v-if="p.code" :href="p.code" target="_blank" rel="noopener" variant="text">Repositorio</v-btn>
                  <p v-if="!p.demo && !p.code" class="project-note">Proyecto interno o sin enlace público.</p>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <section id="formacion" class="section" aria-label="Formación y certificaciones">
        <v-container class="py-16">
          <div class="section-head">
            <h2 class="section-title">Formación y certificaciones</h2>
            <p class="section-desc">Base académica y especialización continua en seguridad, redes y gestión de calidad.</p>
          </div>

          <v-row class="mt-8" align="stretch">
            <v-col cols="12" md="6">
              <v-card class="glass detail-card" rounded="xl" elevation="0">
                <v-card-title class="text-h6">Educación</v-card-title>
                <v-card-text>
                  <ul class="facts">
                    <li v-for="item in education" :key="item.degree">
                      <v-icon icon="$schoolOutline" size="18" />
                      <span><strong>{{ item.degree }}</strong><br />{{ item.institution }}</span>
                    </li>
                  </ul>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card class="glass detail-card" rounded="xl" elevation="0">
                <v-card-title class="text-h6">Certificaciones</v-card-title>
                <v-card-text>
                  <ul class="cert-list">
                    <li v-for="cert in certifications" :key="cert.name">
                      <p class="cert-name">{{ cert.name }}</p>
                      <p class="cert-meta">{{ cert.issuer }} · {{ cert.year }}</p>
                    </li>
                  </ul>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card class="glass detail-card" rounded="xl" elevation="0">
                <v-card-title class="text-h6">Idiomas</v-card-title>
                <v-card-text>
                  <div class="chips">
                    <v-chip v-for="lang in languages" :key="lang" variant="tonal" color="primary" class="ma-1">
                      {{ lang }}
                    </v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card class="glass detail-card" rounded="xl" elevation="0">
                <v-card-title class="text-h6">Soft skills</v-card-title>
                <v-card-text>
                  <div class="chips">
                    <v-chip v-for="item in softSkills" :key="item" variant="tonal" color="secondary" class="ma-1">
                      {{ item }}
                    </v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <section id="contacto" class="section" aria-label="Contacto">
        <v-container class="py-16">
          <div class="section-head">
            <h2 class="section-title">Contacto</h2>
            <p class="section-desc">
              Si tu organización necesita liderazgo técnico, seguridad operativa y despliegues confiables, conversemos.
            </p>
          </div>

          <v-row class="mt-8" align="stretch">
            <v-col cols="12" md="7">
              <v-card class="glass" rounded="xl" elevation="0">
                <v-card-text class="prose">
                  <p><strong>Email:</strong> <a :href="'mailto:' + profile.email">{{ profile.email }}</a></p>
                  <p><strong>Teléfono:</strong> <a :href="'tel:' + profile.phoneDial">{{ profile.phone }}</a></p>
                  <p><strong>WhatsApp:</strong> <a :href="profile.whatsapp" target="_blank" rel="noopener">{{ profile.phone }}</a></p>
                  <p><strong>Ubicación:</strong> {{ profile.location }}</p>
                  <p><strong>Disponibilidad:</strong> {{ profile.availability }}</p>
                  <div class="contact-actions">
                    <v-btn color="primary" variant="flat" rounded="lg" :href="'mailto:' + profile.email">
                      <v-icon start icon="$emailOutline" />
                      Enviar email
                    </v-btn>
                    <v-btn variant="tonal" rounded="lg" :href="profile.cvVisualEs" target="_blank" rel="noopener">
                      <v-icon start icon="$fileDocumentOutline" />
                      Descargar CV
                    </v-btn>
                    <v-btn variant="tonal" rounded="lg" :href="'tel:' + profile.phoneDial">
                      <v-icon start icon="$phoneOutline" />
                      Llamar
                    </v-btn>
                    <v-btn variant="tonal" rounded="lg" :href="profile.whatsapp" target="_blank" rel="noopener">
                      <v-icon start icon="$whatsapp" />
                      WhatsApp
                    </v-btn>
                    <v-btn variant="tonal" rounded="lg" :href="profile.github" target="_blank" rel="noopener" :disabled="!profile.github">
                      <v-icon start icon="$github" />
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
                      <v-icon start icon="$linkedin" />
                      LinkedIn
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="5">
              <v-card class="glass" rounded="xl" elevation="0">
                <v-card-title class="text-h6">Objetivo profesional</v-card-title>
                <v-card-text>
                  <ul class="facts">
                    <li v-for="goal in profileGoals" :key="goal">
                      <v-icon icon="$checkCircleOutline" size="18" />
                      <span>{{ goal }}</span>
                    </li>
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
const setDocumentTheme = inject("setDocumentTheme", () => {});

const profile = {
  name: "Jorge Luis Sánchez Casanova",
  shortName: "Jorge LSC",
  kicker: "Tech Lead | DevSecOps",
  headline: "Más de 6 años combinando ciberseguridad, SOC/CERT, automatización e infraestructura sobre AWS, Kubernetes y Linux.",
  location: "La Habana, Cuba",
  availability: "Disponible para trabajo remoto e internacional",
  relocation: "Abierto a reubicación",
  languagesSummary: "Español nativo / Inglés técnico funcional",
  email: "jorgeluis961224@gmail.com",
  phone: "+55 41 99228-0044",
  phoneDial: "+5541992280044",
  whatsapp: "https://wa.me/5541992280044",
  github: "https://github.com/jorgelsc-dev",
  linkedin: "https://www.linkedin.com/in/jorgelsc-dev",
  photo: "/jorge-luis-profile.png",
  cvDevOpsEs: "/CV-Jorge-Luis-DevOps-ATS-ES.pdf",
  cvDevOpsPt: "/CV-Jorge-Luis-DevOps-ATS-PT-BR.pdf",
  cvSecurityEs: "/CV-Jorge-Luis-Ciberseguridad-ATS-ES.pdf",
  cvSecurityPt: "/CV-Jorge-Luis-Ciberseguranca-ATS-PT-BR.pdf",
  cvVisualEs: "/CV-Jorge-Luis-Visual-ES.pdf",
  cvVisualPt: "/CV-Jorge-Luis-Visual-PT-BR.pdf"
};

const nav = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "experiencia", label: "Experiencia" },
  { id: "logros", label: "Logros" },
  { id: "skills", label: "Skills" },
  { id: "cv", label: "CV" },
  { id: "proyectos", label: "Proyectos" },
  { id: "formacion", label: "Formación" },
  { id: "contacto", label: "Contacto" }
];

const navDesktop = nav.filter((i) => i.id !== "contacto");

const heroBadges = [
  { icon: "$accountTieOutline", label: "Liderazgo técnico" },
  { icon: "$sourceBranch", label: "DevSecOps" },
  { icon: "$cloudLockOutline", label: "AWS + Kubernetes" },
  { icon: "$checkCircleOutline", label: "Impacto medible" }
];

const featuredSkills = ["AWS", "Kubernetes", "Docker", "GitLab CI", "GitHub Actions", "Python"];

const impactMetrics = [
  { value: "6+ años", label: "seguridad, DevOps y software" },
  { value: "<72 h", label: "recuperación ante ransomware" },
  { value: "3x+", label: "mejora en detección SIEM" },
  { value: "80+", label: "personas formadas en seguridad" }
];

const operatingModel = [
  { k: "Liderazgo", v: "Ejecución técnica" },
  { k: "Entrega", v: "CI/CD + Continuidad" },
  { k: "Seguridad", v: "DevSecOps + Hardening" },
  { k: "Objetivo", v: "Plataformas resilientes" }
];

const experience = [
  {
    role: "Tech Lead de Desarrollo y DevOps",
    company: "Marox",
    period: "Abr 2025 - Actualidad",
    highlights: [
      "Liderazgo técnico de iniciativas de desarrollo e infraestructura, alineando arquitectura, calidad de entrega y ejecución.",
      "Definición de estándares para despliegues, automatización, revisión técnica y operación de entornos productivos.",
      "Trabajo sobre AWS y Kubernetes para construir entornos reproducibles, escalables y estables.",
      "Acompañamiento al equipo de desarrollo en decisiones técnicas, incidentes complejos y mejora continua del proceso de entrega."
    ]
  },
  {
    role: "Ingeniero DevOps (Part-time)",
    company: "DiangTech",
    period: "2025 - Actualidad",
    highlights: [
      "Soporte DevOps para proyectos de software con foco en automatización y operación segura de plataformas.",
      "Implementación y mantenimiento de pipelines CI/CD, contenedorización con Docker y scripting con Python y Bash.",
      "Administración de servicios sobre Linux, Nginx y PostgreSQL con enfoque en observabilidad y estabilidad.",
      "Colaboración con equipos de desarrollo para reducir fricción entre código, infraestructura y producción."
    ]
  },
  {
    role: "Líder de Ciberseguridad",
    company: "Avangenio S.R.L.",
    period: "Jul 2024 - Ene 2025",
    highlights: [
      "Creación y desarrollo del área de ciberseguridad de la organización.",
      "Definición de políticas, controles y prácticas alineadas con ISO 27001.",
      "Reducción de vulnerabilidades críticas mediante auditorías técnicas, hardening y pruebas de penetración.",
      "Formación de más de 80 empleados en cultura y buenas prácticas de ciberseguridad."
    ]
  },
  {
    role: "Especialista SOC Nivel 3 y Formador",
    company: "ETECSA",
    period: "Nov 2023 - May 2024",
    highlights: [
      "Respuesta a incidentes de alta criticidad en infraestructura de telecomunicaciones y servicios esenciales.",
      "Mitigación de un incidente de ransomware con recuperación operativa total en menos de 72 horas.",
      "Mejora superior a 3x en detección y reducción de tiempos de respuesta mediante trabajo sobre SIEM.",
      "Capacitación de especialistas en análisis, respuesta a incidentes y operación SOC."
    ]
  },
  {
    role: "Especialista en Ciberseguridad",
    company: "OSRI CuCERT",
    period: "Ene 2021 - Nov 2023",
    highlights: [
      "Gestión y coordinación de incidentes cibernéticos con organismos nacionales e internacionales.",
      "Implementación de monitoreo avanzado para protección de infraestructuras críticas.",
      "Trabajo con IDS/IPS, análisis de tráfico y respuesta operativa frente a amenazas reales.",
      "Participación en la protección del evento G77 + China mediante monitoreo preventivo y mitigación operativa."
    ]
  }
];

const achievementCards = [
  {
    value: "<72 h",
    title: "Continuidad operativa",
    description: "Recuperación total de un incidente de ransomware en infraestructura crítica."
  },
  {
    value: "3x+",
    title: "Detección de amenazas",
    description: "Afinamiento e integración de SIEM para elevar capacidad de detección y respuesta."
  },
  {
    value: "80+",
    title: "Cultura de seguridad",
    description: "Formación de colaboradores y especialistas en buenas prácticas, SOC e incident response."
  },
  {
    value: "ISO 27001",
    title: "Gobernanza",
    description: "Creación de controles y prácticas para un área de ciberseguridad desde cero."
  }
];

const cvDownloads = [
  {
    tag: "ATS",
    title: "DevOps Engineer",
    description: "Versión enfocada en AWS, Kubernetes, CI/CD, Linux, automatización y operación de plataformas.",
    es: profile.cvDevOpsEs,
    pt: profile.cvDevOpsPt
  },
  {
    tag: "ATS",
    title: "Ciberseguridad",
    description: "Versión para SOC/CERT, SIEM, hardening, respuesta a incidentes, auditoría y gobernanza.",
    es: profile.cvSecurityEs,
    pt: profile.cvSecurityPt
  },
  {
    tag: "Visual",
    title: "Presentación ejecutiva",
    description: "Versión con foto y diseño más humano para envío directo a reclutadores y networking.",
    es: profile.cvVisualEs,
    pt: profile.cvVisualPt
  }
];

const skills = [
  {
    title: "Dominio principal",
    items: [
      "AWS",
      "Kubernetes",
      "Docker",
      "Linux",
      "GitLab CI",
      "GitHub Actions",
      "Python",
      "Bash",
      "Nginx",
      "PostgreSQL",
      "Elastic Stack",
      "Suricata",
      "Incident Response",
      "Hardening"
    ]
  },
  {
    title: "Experiencia práctica adicional",
    items: [
      "Alibaba Cloud",
      "k3s",
      "Rancher",
      "ECS",
      "EKS",
      "EC2",
      "ECR",
      "S3",
      "IAM",
      "VPC",
      "RDS",
      "Route 53",
      "CloudWatch",
      "CloudTrail",
      "Lambda",
      "WAF",
      "Alibaba ACK",
      "OSS",
      "RAM",
      "SLB",
      "CDN",
      "Alibaba DNS",
      "NAT Gateway"
    ]
  },
  {
    title: "Desarrollo y scripting",
    items: ["JavaScript", "Vue.js", "React", "Django", "Automatización de despliegues", "Integración segura", "Troubleshooting"]
  },
  {
    title: "Ciberseguridad aplicada",
    items: ["Elastic Stack (SIEM)", "Suricata IDS/IPS", "Análisis forense digital", "Pentesting", "Nmap", "Burp Suite", "OWASP ZAP", "Zero Trust"]
  }
];

const pypiPackages = [
  {
    badge: "PyPI · Destacado",
    title: "porthound4",
    description: "Escáner de red de nueva generación construido sobre wsbuilder para auditorías autorizadas en modo standalone.",
    release: "v0.2.1 · Publicado el 28 de mayo de 2026 · Python >=3.12 · Licencia MIT",
    install: "python -m pip install porthound4",
    highlights: [
      "Escaneo TCP, UDP, ICMP y SCTP con banner grabbing por servicio.",
      "API HTTP y WebSocket para gestionar escaneos y estado operativo local.",
      "Persistencia SQLite y documentación pública para despliegue y operación."
    ],
    stack: ["Python", "Network Scanner", "TCP/UDP/ICMP/SCTP", "WebSocket", "SQLite", "PyPI"],
    pypi: "https://pypi.org/project/porthound4/",
    docs: "https://porthound.jorgelsc.dev",
    code: "https://github.com/jorgelsc-dev/porthound",
    issues: "https://github.com/jorgelsc-dev/porthound/issues",
    changelog: "https://github.com/jorgelsc-dev/porthound/blob/main/CHANGELOG.md"
  },
  {
    badge: "PyPI",
    title: "wsbuilder",
    description: "Framework ligero de infraestructura para servicios HTTP + WebSocket, base tecnológica de porthound4.",
    release: "v0.18.0 · Publicado el 27 de mayo de 2026 · Python >=3.11 · Licencia MIT",
    install: "python -m pip install wsbuilder",
    highlights: [
      "Routing HTTP tipado y WebSocket de bajo nivel con control de frames.",
      "Incluye ORM ligero SQLite, cache, seguridad, métricas y tareas en background.",
      "Diseñado para activar módulos de forma composable según necesidad operativa."
    ],
    stack: ["Python", "HTTP", "WebSocket", "SQLite ORM", "Security", "Metrics", "PyPI"],
    pypi: "https://pypi.org/project/wsbuilder/",
    docs: "",
    code: "",
    issues: "",
    changelog: ""
  }
];

const projects = [
  {
    featured: true,
    title: "Detección de tráfico HTTP/HTTPS anómalo con NLP",
    description: "Proyecto técnico enfocado en detección temprana de patrones anómalos para mejorar visibilidad y respuesta.",
    stack: ["NLP", "Python", "Ciberseguridad"],
    demo: "",
    code: ""
  },
  {
    featured: false,
    title: "Automatización de respuestas a incidentes",
    description: "Diseño de flujos operativos para acelerar contención y mitigación en escenarios SOC.",
    stack: ["SOC", "SIEM", "Automatización"],
    demo: "",
    code: ""
  }
];

const education = [
  {
    degree: "Ingeniero en Ciencias Informáticas",
    institution: "Universidad de las Ciencias Informáticas (UCI)"
  }
];

const certifications = [
  { name: "Forense Digital", issuer: "QAX Qianxin", year: "2024" },
  { name: "Monitoreo de Redes Inalámbricas", issuer: "QAX Qianxin", year: "2024" },
  { name: "Gobernanza y Gestión del Ciberespacio", issuer: "AIBO / Ministerio de Comercio de China", year: "2024" },
  { name: "ISO 9001 (Profundización)", issuer: "Lloyd's Register", year: "2019" }
];

const languages = ["Español (nativo)", "Inglés técnico funcional"];

const softSkills = [
  "Liderazgo técnico y mentoría",
  "Resolución de problemas críticos",
  "Comunicación efectiva",
  "Pensamiento analítico",
  "Enfoque a resultados"
];

const profileGoals = [
  "Liderar iniciativas que unan entrega, seguridad y operación.",
  "Escalar cultura DevSecOps en equipos de desarrollo.",
  "Reducir riesgo operativo con automatización y observabilidad.",
  "Construir plataformas resilientes, seguras y mantenibles."
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
  try {
    localStorage.setItem(STORAGE_THEME_KEY, next);
  } catch {
    // Ignore storage write errors (e.g. private mode restrictions).
  }
  setDocumentTheme(next);
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
