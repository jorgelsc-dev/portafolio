export function createAboutVisualization() {
  const width = document.getElementById('about-visualization').clientWidth;
  const height = 300;

  const svg = d3.select('#about-visualization')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Create moving wave pattern
  const wave = svg.append('path')
    .attr('fill', 'none')
    .attr('stroke', '#009ffd')
    .attr('stroke-width', 2);

  function updateWave(t) {
    const points = d3.range(0, width + 10, 10)
      .map(x => {
        const y = Math.sin(x * 0.02 + t) * 30 + height/2;
        return [x, y];
      });

    wave.attr('d', d3.line()(points));
  }

  d3.timer((elapsed) => {
    updateWave(elapsed * 0.002);
  });
}