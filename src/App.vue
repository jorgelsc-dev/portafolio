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
                <v-btn color="primary" variant="flat" rounded="lg" size="large" @click="scrollTo('experiencia')">
                  Ver experiencia
                  <v-icon end icon="mdi-arrow-right" />
                </v-btn>
                <v-btn variant="tonal" rounded="lg" size="large" @click="scrollTo('sobre-mi')">Sobre mí</v-btn>
              </div>

              <div class="hero-badges" aria-label="Especialidades">
                <span v-for="badge in heroBadges" :key="badge.label" class="badge">
                  <v-icon :icon="badge.icon" size="18" />
                  <span>{{ badge.label }}</span>
                </span>
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
              Ingeniero en Ciencias Informáticas orientado a ciberseguridad ofensiva/defensiva, automatización y
              operación segura de infraestructuras críticas.
            </p>
          </div>

          <v-row class="mt-8" align="stretch">
            <v-col cols="12" md="7">
              <v-card class="glass" rounded="xl" elevation="0">
                <v-card-text class="prose">
                  <p>
                    Soy <strong>{{ profile.name }}</strong>, especialista en ciberseguridad, DevOps y arquitectura cloud
                    con más de 6 años de experiencia. He trabajado en SOC, operaciones Red/Blue Team y despliegue de
                    plataformas seguras en producción.
                  </p>
                  <p>
                    Mi enfoque combina respuesta a incidentes, hardening, SIEM, automatización con CI/CD y Kubernetes
                    para reducir riesgos operativos y mejorar continuidad de negocio.
                  </p>
                  <p>
                    Busco integrarme en equipos multidisciplinarios donde pueda aportar mediante cultura DevSecOps,
                    mitigación proactiva y mejora continua.
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
                    <li><v-icon icon="mdi-translate" size="18" /><span>{{ profile.languagesSummary }}</span></li>
                    <li><v-icon icon="mdi-briefcase-check-outline" size="18" /><span>{{ profile.availability }}</span></li>
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

      <section id="experiencia" class="section" aria-label="Experiencia">
        <v-container class="py-16">
          <div class="section-head">
            <h2 class="section-title">Experiencia</h2>
            <p class="section-desc">
              Trayectoria reciente en ciberseguridad, operaciones SOC y plataformas cloud para servicios de misión crítica.
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

      <section id="proyectos" class="section" aria-label="Proyectos">
        <v-container class="py-16">
          <div class="section-head">
            <h2 class="section-title">Proyectos</h2>
            <p class="section-desc">Casos relevantes en ciberseguridad, analítica y automatización operativa.</p>
          </div>

          <v-row class="mt-8">
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
                      <v-icon icon="mdi-school-outline" size="18" />
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
              Si tu organización necesita fortalecer su postura de seguridad y automatizar operación, conversemos.
            </p>
          </div>

          <v-row class="mt-8" align="stretch">
            <v-col cols="12" md="7">
              <v-card class="glass" rounded="xl" elevation="0">
                <v-card-text class="prose">
                  <p><strong>Email:</strong> <a :href="'mailto:' + profile.email">{{ profile.email }}</a></p>
                  <p><strong>Teléfono:</strong> <a :href="'tel:' + profile.phoneDial">{{ profile.phone }}</a></p>
                  <p><strong>Ubicación:</strong> {{ profile.location }}</p>
                  <p><strong>Disponibilidad:</strong> {{ profile.availability }}</p>
                  <div class="contact-actions">
                    <v-btn color="primary" variant="flat" rounded="lg" :href="'mailto:' + profile.email">
                      <v-icon start icon="mdi-email-outline" />
                      Enviar email
                    </v-btn>
                    <v-btn variant="tonal" rounded="lg" :href="'tel:' + profile.phoneDial">
                      <v-icon start icon="mdi-phone-outline" />
                      Llamar
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
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="5">
              <v-card class="glass" rounded="xl" elevation="0">
                <v-card-title class="text-h6">Objetivo profesional</v-card-title>
                <v-card-text>
                  <ul class="facts">
                    <li v-for="goal in profileGoals" :key="goal">
                      <v-icon icon="mdi-check-circle-outline" size="18" />
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

const profile = {
  name: "Jorge Luis Sánchez Casanova",
  shortName: "Jorge LSC",
  kicker: "Especialista en Ciberseguridad | Ingeniero DevOps | Arquitecto Cloud",
  headline: "Más de 6 años en Red/Blue Team, SOC, DevSecOps y operación multi-cloud sobre AWS y Alibaba Cloud.",
  location: "La Habana, Cuba",
  availability: "Disponible para trabajo remoto e internacional",
  languagesSummary: "Español nativo / Inglés técnico (básico)",
  email: "jorgeluis961224@gmail.com",
  phone: "+53 55375310",
  phoneDial: "+5355375310",
  github: "https://github.com/jorgelsc-dev",
  linkedin: "https://www.linkedin.com/in/jorgelsc-dev"
};

const nav = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "experiencia", label: "Experiencia" },
  { id: "skills", label: "Skills" },
  { id: "proyectos", label: "Proyectos" },
  { id: "formacion", label: "Formación" },
  { id: "contacto", label: "Contacto" }
];

const navDesktop = nav.filter((i) => i.id !== "contacto");

const heroBadges = [
  { icon: "mdi-shield-sword-outline", label: "Red Team / Blue Team" },
  { icon: "mdi-source-branch", label: "DevSecOps" },
  { icon: "mdi-cloud-lock-outline", label: "AWS + Alibaba Cloud" }
];

const featuredSkills = ["AWS EKS", "Alibaba ACK", "EC2/ECS", "S3/OSS", "GitLab CI", "Python"];

const operatingModel = [
  { k: "Enfoque", v: "Seguridad + Automatización" },
  { k: "Entrega", v: "HA + Continuidad" },
  { k: "Respuesta", v: "Incidentes críticos" },
  { k: "Objetivo", v: "Mitigación proactiva" }
];

const experience = [
  {
    role: "Ingeniero DevOps",
    company: "TECOPOS",
    period: "Ene 2025 - Actualidad",
    highlights: [
      "Administración multi-cloud sobre AWS y Alibaba Cloud en entornos de alta disponibilidad.",
      "Automatización de despliegues con CI/CD en GitLab CI y GitHub Actions.",
      "Orquestación de contenedores con Kubernetes (AWS EKS, Alibaba ACK, k3s, Rancher).",
      "Operación de servicios cloud: EC2/ECS, S3/OSS, VPC, IAM/RAM, RDS, ELB/SLB, CloudWatch/CloudMonitor.",
      "Optimización de PostgreSQL, HAProxy y Nginx para entornos críticos."
    ]
  },
  {
    role: "Jefe de Ciberseguridad",
    company: "Avangenio S.R.L.",
    period: "Jul 2024",
    highlights: [
      "Definición y ejecución de estrategia integral de ciberseguridad.",
      "Auditorías internas y pentesting sobre sistemas de negocio.",
      "Implementación de controles ISO 27001 y hardening de red."
    ]
  },
  {
    role: "Especialista Nivel 3 (SOC)",
    company: "ETECSA",
    period: "Nov 2023 - May 2024",
    highlights: [
      "Respuesta en tiempo real a incidentes de alta criticidad.",
      "Despliegue y afinamiento de SIEM con Elastic Stack.",
      "Operaciones Red Team con explotación controlada e informes técnicos."
    ]
  },
  {
    role: "Especialista en Ciberseguridad",
    company: "OSRI CuCERT",
    period: "Ene 2021 - Nov 2023",
    highlights: [
      "Mitigación de ataques en redes nacionales.",
      "Monitoreo y análisis de tráfico con Suricata IDS/IPS.",
      "Mentoría en análisis forense digital y respuesta a incidentes."
    ]
  }
];

const skills = [
  {
    title: "Ciberseguridad",
    items: ["Elastic Stack (SIEM)", "Suricata IDS/IPS", "Forense digital", "Pentesting", "Nmap", "Burp Suite", "OWASP ZAP", "Zero Trust"]
  },
  {
    title: "DevOps y Cloud",
    items: [
      "AWS EKS",
      "AWS EC2",
      "AWS ECS",
      "AWS ECR",
      "AWS S3",
      "AWS IAM",
      "AWS VPC",
      "AWS RDS",
      "AWS ELB/ALB",
      "AWS Route 53",
      "AWS CloudWatch",
      "AWS CloudTrail",
      "AWS Auto Scaling",
      "AWS Lambda",
      "AWS WAF",
      "AWS KMS",
      "AWS Systems Manager",
      "Alibaba ACK",
      "Alibaba ECS",
      "Alibaba OSS",
      "Alibaba Container Registry",
      "Alibaba RAM",
      "Alibaba VPC",
      "Alibaba SLB",
      "Alibaba RDS",
      "Alibaba CloudMonitor",
      "Alibaba ActionTrail",
      "Alibaba DNS",
      "Alibaba NAT Gateway",
      "Alibaba CDN",
      "Alibaba WAF",
      "Docker",
      "Kubernetes",
      "k3s",
      "Rancher",
      "GitOps",
      "GitLab CI",
      "GitHub Actions"
    ]
  },
  {
    title: "Automatización y Desarrollo",
    items: ["Python", "Bash", "JavaScript", "Vue.js", "React", "Django", "PostgreSQL", "Elasticsearch"]
  },
  {
    title: "Sistemas y Redes",
    items: ["Linux (Debian, Ubuntu, Kali)", "Nginx", "HAProxy", "Hardening", "Monitoreo", "Backup y Disaster Recovery"]
  }
];

const projects = [
  {
    featured: true,
    title: "Sistema nacional de Blacklist para ETECSA",
    description: "Diseño e implementación de un sistema de clasificación y bloqueo para fortalecer defensa de red a nivel nacional.",
    stack: ["Ciberseguridad", "Automatización", "Análisis de tráfico"],
    demo: "",
    code: ""
  },
  {
    featured: true,
    title: "Detección de tráfico HTTP/HTTPS anómalo con NLP",
    description: "Modelo de detección temprana sobre patrones de tráfico para mejorar visibilidad y respuesta frente a amenazas.",
    stack: ["NLP", "Python", "Ciberseguridad"],
    demo: "",
    code: ""
  },
  {
    featured: false,
    title: "Automatización de respuestas a incidentes",
    description: "Flujos automáticos para contención y mitigación en operaciones SOC, reduciendo tiempo de reacción.",
    stack: ["SOC", "SIEM", "Scripts"],
    demo: "",
    code: ""
  },
  {
    featured: false,
    title: "Pipelines CI/CD con despliegue seguro",
    description: "Integración de testing, validaciones y despliegue controlado sobre clústeres Kubernetes en AWS EKS y Alibaba ACK.",
    stack: ["GitLab CI", "GitHub Actions", "AWS EKS", "Alibaba ACK"],
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
  { name: "ISO 9001 (Profundización)", issuer: "Lloyd's Register", year: "2019" }
];

const languages = ["Español (nativo)", "Inglés técnico (básico)"];

const softSkills = [
  "Liderazgo técnico y mentoría",
  "Resolución de problemas críticos",
  "Comunicación efectiva",
  "Pensamiento analítico",
  "Enfoque a resultados"
];

const profileGoals = [
  "Aportar valor en equipos multidisciplinarios.",
  "Impulsar cultura DevSecOps y automatización.",
  "Mitigar riesgos con enfoque preventivo y medible.",
  "Operar infraestructuras resilientes y seguras."
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
