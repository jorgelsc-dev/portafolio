import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';

const cvContent = `
# Jane Doe
## Senior Frontend Developer

### Professional Experience

#### Senior Frontend Developer at TechCorp (2020-Present)
* Led development of multiple React-based enterprise applications
* Implemented modern CI/CD practices
* Mentored junior developers

#### Frontend Developer at WebStudio (2018-2020)
* Built responsive web applications
* Worked with D3.js for data visualization
* Developed custom CSS animations

### Education

* **Masters in Computer Science**  
  Stanford University (2016-2018)
* **Bachelor in Software Engineering**  
  MIT (2012-2016)

### Technical Skills

* JavaScript/TypeScript
* React/Vue.js
* D3.js
* Node.js
* HTML5/CSS3
* Git

### Languages

* English (Native)
* Spanish (Fluent)
* French (Intermediate)

### Certifications

* AWS Certified Developer
* Google Cloud Professional
* MongoDB Certified Developer
`;

export function renderCV() {
  const cvContainer = document.getElementById('cv-content');
  if (!cvContainer) return;

  // Configure marked options
  marked.setOptions({
    gfm: true,
    breaks: true,
    headerIds: true
  });

  // Convert markdown to HTML and insert
  cvContainer.innerHTML = marked.parse(cvContent);

  // Add animation to sections
  const sections = cvContainer.querySelectorAll('h1, h2, h3, h4, ul');
  sections.forEach((section, index) => {
    section.setAttribute('data-aos', 'fade-up');
    section.setAttribute('data-aos-delay', `${index * 100}`);
  });
}