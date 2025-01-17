import { initializeParticles } from './particles.js';
import { createHeroAnimation } from './hero.js';
import { createAboutVisualization } from './about.js';
import { createSkillsChart } from './skills.js';
import { createProjectsGrid } from './projects.js';
import { initializeNavigation } from './navigation.js';
import { renderCV } from './cv.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
    mirror: false
  });

  // Initialize all visualizations
  initializeParticles();
  createHeroAnimation();
  createAboutVisualization();
  createSkillsChart();
  createProjectsGrid();
  initializeNavigation();
  renderCV();
});