// Helper to compute the maximum node value in a dataset
function getMaxNodeValue(data) {
  const nodeValues = {};
  data.nodes.forEach(node => { nodeValues[node.name] = 0; });
  data.links.forEach(link => {
    nodeValues[link.source] = (nodeValues[link.source] || 0) + link.value;
    nodeValues[link.target] = (nodeValues[link.target] || 0) + link.value;
  });
  return Math.max(...Object.values(nodeValues));
}

// Compute the global maximum node value across all datasets
datasets = [data1, data2, data3, data4];
const globalMax = Math.max(...datasets.map(getMaxNodeValue));

function drawSankeyChart(data, containerId, globalMax, nodeAlign = "sankeyLeft", linkColor = "source") {
  const width = 600;
  const minHeight = 90; // Minimum height for very small charts
  const maxHeight = 600; // Maximum height for the largest chart
  const format = d3.format(",.0f");

  // Compute the local max for this dataset
  const localMax = getMaxNodeValue(data);

  // Calculate a scaling factor so that the largest node in any chart uses the same width
  const scale = localMax / globalMax;
  const height = Math.max(minHeight, maxHeight * scale);

  // Create a SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

  // Constructs and configures a Sankey generator.
  const sankey = d3.sankey()
      .nodeId(d => d.name)
      .nodeAlign(d3[nodeAlign]) // d3.sankeyLeft, etc.
      .nodeWidth(15)
      .nodePadding(10 * scale)
      .extent([[1, 5], [width - 1, height - 5]]);

  // Applies it to the data. We make a copy of the nodes and links objects
  // so as to avoid mutating the original.
  const {nodes, links} = sankey({
    nodes: data.nodes.map(d => Object.assign({}, d)),
    links: data.links.map(d => Object.assign({}, d))
  });

  // Defines a color scale.
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  // Creates the rects that represent the nodes.
  const rect = svg.append("g")
      .attr("stroke", "#000")
    .selectAll("rect")
    .data(nodes)
    .join("rect")
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("height", d => d.y1 - d.y0)
      .attr("width", d => d.x1 - d.x0)
      .attr("fill", d => d.x0 >= width / 2 ? "red" : color(d.category));

  // Adds a title on the nodes.
  rect.append("title")
      .text(d => `${d.name}\n${format(d.value)} TWh`);

  // Define node type colors
  function nodeTypeColor(name) {
    name = name.toLowerCase();
    if (name.includes("motorist")) return "red";
    if (name.includes("cyclist")) return "yellow";
    if (name.includes("pedestrian")) return "blue";
    return "#888";
  }

  // Add gradients to SVG defs
  const defs = svg.append("defs");

  // Creates the paths that represent the links.
  const link = svg.append("g")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.5)
    .selectAll("g")
    .data(links)
    .join("g")
      .style("mix-blend-mode", "multiply");

  // For each link, create a unique gradient
  link.each(function(d, i) {
    const gradId = `gradient-${containerId}-${i}`;
    const grad = defs.append("linearGradient")
      .attr("id", gradId)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", d.source.x1)
      .attr("x2", d.target.x0)
      .attr("y1", (d.source.y0 + d.source.y1) / 2)
      .attr("y2", (d.target.y0 + d.target.y1) / 2);
    grad.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", nodeTypeColor(d.source.name));
    grad.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", nodeTypeColor(d.target.name));
    d.gradientId = gradId;
  });

  link.append("path")
      .attr("d", d3.sankeyLinkHorizontal())
      .attr("stroke", d => `url(#${d.gradientId})`)
      .attr("stroke-width", d => Math.max(1, d.width));

  link.append("title")
      .text(d => `${d.source.name} → ${d.target.name}\n${format(d.value)} TWh`);

  // Adds labels on the nodes.
  svg.append("g")
    .selectAll("text")
    .data(nodes)
    .join("text")
      .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
      .attr("y", d => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
      .text(d => d.name);

  // Append to container
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = "";
    container.appendChild(svg.node());
  }
}

drawSankeyChart(data1, "canvas-container-1", globalMax);
drawSankeyChart(data2, "canvas-container-2", globalMax);
drawSankeyChart(data3, "canvas-container-3", globalMax);
drawSankeyChart(data4, "canvas-container-4", globalMax);