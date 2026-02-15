(() => {
  "use strict";

  const STORAGE_THEME_KEY = "jorgelsc:theme";

  const profile = {
    name: "Jorge Luis Sánchez Casanova",
    shortName: "Jorge LSC",
    kicker: "Frontend Developer",
    headline: "Construyo experiencias web rápidas, accesibles y con diseño cuidado.",
    location: "Remoto (LatAm)",
    // Actualiza este email por el tuyo real si aplica.
    email: "hola@jorgelsc.dev",
    // Completa estos links o déjalos vacíos.
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

  function prefersReducedMotion() {
    return Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  function getInitialThemeName() {
    const saved = localStorage.getItem(STORAGE_THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    const prefersLight = Boolean(window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches);
    return prefersLight ? "light" : "dark";
  }

  function setThemeColorMeta(themeName) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    meta.setAttribute("content", themeName === "light" ? "#F7F8FA" : "#070A12");
  }

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start"
    });
    if (history.replaceState) history.replaceState(null, "", `#${id}`);
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!window.Vue || !window.Vuetify) {
      // eslint-disable-next-line no-console
      console.error("Vue/Vuetify no estan disponibles. Revisa los scripts CDN.");
      return;
    }

    const initialThemeName = getInitialThemeName();
    setThemeColorMeta(initialThemeName);

    const vuetify = Vuetify.createVuetify({
      theme: {
        defaultTheme: initialThemeName,
        themes: {
          dark: {
            dark: true,
            colors: {
              background: "#070A12",
              surface: "#0B1020",
              primary: "#38BDF8",
              secondary: "#A3E635",
              error: "#FB7185",
              info: "#38BDF8",
              success: "#A3E635",
              warning: "#FBBF24"
            }
          },
          light: {
            dark: false,
            colors: {
              background: "#F7F8FA",
              surface: "#FFFFFF",
              primary: "#0EA5E9",
              secondary: "#65A30D",
              error: "#E11D48",
              info: "#0EA5E9",
              success: "#65A30D",
              warning: "#F59E0B"
            }
          }
        }
      },
      icons: {
        defaultSet: "mdi"
      }
    });

    const { createApp, ref, computed, onMounted } = Vue;

    createApp({
      setup() {
        const drawer = ref(false);
        const activeSection = ref("inicio");
        const copied = ref(false);
        const year = new Date().getFullYear();

        const theme = Vuetify.useTheme();
        const isDark = computed(() => theme.global.current.value.dark);

        function toggleTheme() {
          const next = isDark.value ? "light" : "dark";
          theme.global.name.value = next;
          localStorage.setItem(STORAGE_THEME_KEY, next);
          setThemeColorMeta(next);
        }

        function scrollTo(id) {
          drawer.value = false;
          scrollToId(id);
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

        onMounted(() => {
          const ids = nav.map((n) => n.id);
          const targets = ids
            .map((id) => document.getElementById(id))
            .filter(Boolean);

          const io = new IntersectionObserver(
            (entries) => {
              let best = null;
              for (const e of entries) {
                if (!e.isIntersecting) continue;
                if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
              }
              if (best && best.target && best.target.id) activeSection.value = best.target.id;
            },
            {
              root: null,
              threshold: [0.2, 0.35, 0.5, 0.65],
              rootMargin: "-25% 0px -60% 0px"
            }
          );

          for (const t of targets) io.observe(t);
        });

        return {
          profile,
          nav,
          navDesktop,
          featuredSkills,
          skills,
          projects,
          drawer,
          activeSection,
          isDark,
          year,
          toggleTheme,
          scrollTo,
          copyEmail,
          copied
        };
      }
    })
      .use(vuetify)
      .mount("#app");
  });
})();
