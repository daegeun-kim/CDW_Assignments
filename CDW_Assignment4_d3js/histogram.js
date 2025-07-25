d3.json("accidents_hour.json").then((data) => {
  // Declare the chart dimensions and margins.
const width = 900;
const height = 500;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 50;
const marginLeft = 50;

// Bin the data.
const bins = d3.bin()
.thresholds(24)
.value((d) => d.HOUR)(data);

// Declare the x (horizontal position) scale.
const x = d3.scaleLinear()
    .domain([bins[0].x0, bins[bins.length - 1].x1])
    .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const y = d3.scaleLinear()
    .domain([0, d3.max(bins, (d) => d.length)])
    .range([height - marginBottom, marginTop]);

// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

// Add a rect for each bin.
svg.append("g")
    .attr("fill", "steelblue")
.selectAll()
.data(bins)
.join("rect")
    .attr("x", (d) => x(d.x0) + 1)
    .attr("width", (d) => x(d.x1) - x(d.x0) - 1)
    .attr("y", (d) => y(d.length))
    .attr("height", (d) => y(0) - y(d.length));

// Add the x-axis and label.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
    .call((g) => g.append("text")
        .attr("x", width)
        .attr("y", marginBottom - 3)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text("Hour of the day"))
        .style("font-size", "12px");

// Add the y-axis and label, and remove the domain line.
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(height / 40))
    .call((g) => g.select(".domain").remove())
    .call((g) => g.append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Frequency (no. of counties)"))
        .style("font-size", "12px");

// Return the SVG element.
d3.select("#canvas-container-1").append(() => svg.node());
})