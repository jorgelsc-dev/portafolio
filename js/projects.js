export function createProjectsGrid() {
  const projects = [
    {
      title: 'Project 1',
      description: 'Interactive data visualization dashboard',
      technologies: ['D3.js', 'React', 'Node.js']
    },
    {
      title: 'Project 2',
      description: 'E-commerce platform with real-time updates',
      technologies: ['Vue.js', 'Firebase', 'Stripe']
    },
    {
      title: 'Project 3',
      description: 'AI-powered content management system',
      technologies: ['Python', 'TensorFlow', 'React']
    }
  ];

  const container = document.getElementById('projects-grid');

  projects.forEach(project => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.setAttribute('data-aos', 'fade-up');

    const card = document.createElement('div');
    card.className = 'project-card';

    const title = document.createElement('h3');
    title.textContent = project.title;

    const description = document.createElement('p');
    description.textContent = project.description;

    const technologies = document.createElement('div');
    technologies.className = 'technologies';
    project.technologies.forEach(tech => {
      const badge = document.createElement('span');
      badge.className = 'badge bg-primary me-2';
      badge.textContent = tech;
      technologies.appendChild(badge);
    });

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(technologies);
    col.appendChild(card);
    container.appendChild(col);
  });
}