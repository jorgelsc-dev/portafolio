export function createHeroAnimation() {
  const width = document.getElementById('hero-animation').clientWidth;
  const height = document.getElementById('hero-animation').clientHeight;

  const svg = d3.select('#hero-animation')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Create geometric shapes that float and rotate
  const shapes = [
    { type: 'circle', x: width * 0.3, y: height * 0.5, size: 40 },
    { type: 'rect', x: width * 0.6, y: height * 0.3, size: 50 },
    { type: 'polygon', x: width * 0.7, y: height * 0.7, size: 45 }
  ];

  shapes.forEach((shape, i) => {
    if (shape.type === 'circle') {
      svg.append('circle')
        .attr('cx', shape.x)
        .attr('cy', shape.y)
        .attr('r', shape.size)
        .attr('fill', 'none')
        .attr('stroke', '#009ffd')
        .attr('stroke-width', 2)
        .attr('class', 'floating')
        .style('animation-delay', `${i * 0.5}s`);
    } else if (shape.type === 'rect') {
      svg.append('rect')
        .attr('x', shape.x - shape.size/2)
        .attr('y', shape.y - shape.size/2)
        .attr('width', shape.size)
        .attr('height', shape.size)
        .attr('fill', 'none')
        .attr('stroke', '#009ffd')
        .attr('stroke-width', 2)
        .attr('class', 'floating')
        .style('animation-delay', `${i * 0.5}s`);
    } else if (shape.type === 'polygon') {
      const points = d3.range(3).map(i => [
        shape.x + shape.size * Math.cos(i * 2 * Math.PI / 3),
        shape.y + shape.size * Math.sin(i * 2 * Math.PI / 3)
      ]);
      
      svg.append('polygon')
        .attr('points', points.join(' '))
        .attr('fill', 'none')
        .attr('stroke', '#009ffd')
        .attr('stroke-width', 2)
        .attr('class', 'floating')
        .style('animation-delay', `${i * 0.5}s`);
    }
  });
}