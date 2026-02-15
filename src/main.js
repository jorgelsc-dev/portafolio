import { createApp } from "vue";
import App from "./App.vue";

import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "./styles/app.css";

import { createVuetify } from "vuetify";

const STORAGE_THEME_KEY = "jorgelsc:theme";

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

const initialThemeName = getInitialThemeName();
setThemeColorMeta(initialThemeName);

const vuetify = createVuetify({
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

createApp(App)
  .provide("storageThemeKey", STORAGE_THEME_KEY)
  .provide("setThemeColorMeta", setThemeColorMeta)
  .use(vuetify)
  .mount("#app");
