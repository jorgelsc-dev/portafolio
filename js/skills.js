export function createSkillsChart() {
  const skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'HTML/CSS', level: 85 },
    { name: 'React', level: 80 },
    { name: 'D3.js', level: 75 },
    { name: 'Node.js', level: 70 },
    { name: 'Python', level: 65 }
  ];

  const width = document.getElementById('skills-chart').clientWidth;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 40, left: 90 };

  const svg = d3.select('#skills-chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const x = d3.scaleLinear()
    .domain([0, 100])
    .range([margin.left, width - margin.right]);

  const y = d3.scaleBand()
    .domain(skills.map(d => d.name))
    .range([margin.top, height - margin.bottom])
    .padding(0.1);

  // Add the bars
  svg.selectAll('rect')
    .data(skills)
    .join('rect')
    .attr('x', margin.left)
    .attr('y', d => y(d.name))
    .attr('width', 0)
    .attr('height', y.bandwidth())
    .attr('fill', '#009ffd')
    .transition()
    .duration(1000)
    .attr('width', d => x(d.level) - margin.left);

  // Add the axes
  svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .attr('color', '#ffffff');

  svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .attr('color', '#ffffff');
}