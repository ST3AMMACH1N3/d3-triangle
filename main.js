const graphDiv = document.getElementById("triangle-graph");
const svg = d3.select("#triangle-graph").append("svg");
let data = {
  resumes: 120,
  clientIntrests: 100,
  interviews: 111,
  offersAnticipated: 80,
  offersExtended: 95,
};

function redraw() {
  const width = graphDiv.clientWidth;
  const height = graphDiv.clientHeight;

  const dataArray = Object.values(data);

  svg.attr("width", width).attr("height", height);

  svg.html("");

  const svgDefs = svg.append("defs");

  const triangleGradient = svgDefs
    .append("linearGradient")
    .attr("id", "triangle-gradient")
    .attr("gradientTransform", "rotate(90)");

  triangleGradient
    .append("stop")
    .attr("class", "triangle-stop-left")
    .attr("offset", "0");

  triangleGradient
    .append("stop")
    .attr("class", "triangle-stop-right")
    .attr("offset", "1");

  const largest = Math.max(...dataArray);

  const g = svg.append("g").attr("class", "triangles");

  const triangleWidth = (width / (dataArray.length + 1)) * 2;

  const drawTriangle = (d, i) => {
    const triangleHeight = (height / largest / 3) * 2 * d;
    const triangle = d3.path();
    triangle.moveTo((triangleWidth / 2) * i, height);
    triangle.lineTo(
      (triangleWidth / 2) * i + triangleWidth / 2,
      height - triangleHeight
    );
    triangle.lineTo((triangleWidth / 2) * i + triangleWidth, height);
    triangle.closePath();
    triangle.moveTo(
      (triangleWidth / 2) * i + triangleWidth - (triangleWidth / 9) * 2,
      height - triangleWidth / 6
    );
    triangle.lineTo(
      (triangleWidth / 2) * i + triangleWidth / 2,
      height - triangleHeight + triangleHeight / 3
    );
    triangle.lineTo(
      (triangleWidth / 2) * i + (triangleWidth / 9) * 2,
      height - triangleWidth / 6
    );
    triangle.closePath();
    return triangle;
  };

  g.selectAll(".triangle")
    .data(dataArray)
    .enter()
    .append("path")
    .attr("class", "triangle")
    .attr("d", drawTriangle);

  const lineHeight = 50;

  const drawLine = (d, i) => {
    const triangleHeight = (height / largest / 3) * 2 * d;
    const line = d3.path();
    line.moveTo(
      (triangleWidth / 2) * i + triangleWidth / 2,
      height - triangleHeight
    );
    line.lineTo(
      (triangleWidth / 2) * i + triangleWidth / 2,
      height - triangleHeight - lineHeight
    );
    return line;
  };

  g.selectAll(".connector")
    .data(dataArray)
    .enter()
    .append("path")
    .attr("class", ".connector")
    .attr("stroke", "#000")
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", `${lineHeight / 5}, ${lineHeight / 5}`)
    .attr("d", drawLine);

  const circleRadius = 25;

  g.selectAll(".label-circle")
    .data(dataArray)
    .enter()
    .append("circle")
    .attr("r", circleRadius)
    .attr("cx", (d, i) => (triangleWidth / 2) * i + triangleWidth / 2)
    .attr("cy", (d, i) => {
      const triangleHeight = (height / largest / 3) * 2 * d;
      return height - triangleHeight - lineHeight - circleRadius;
    })
    .attr("fill-opacity", 0)
    .attr("stroke", "#000");

  g.selectAll(".label")
    .data(dataArray)
    .enter()
    .append("text")
    .attr("font-size", circleRadius)
    .attr("fill", "#000")
    .attr("x", (d, i) => (triangleWidth / 2) * i + triangleWidth / 2)
    .attr("y", (d) => {
      const triangleHeight = (height / largest / 3) * 2 * d;
      return height - triangleHeight - lineHeight - circleRadius;
    })
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text((d) => d);
}

redraw();

// setTimeout(() => {
//   data = {
//     resumes: 80,
//     clientIntrests: 111,
//     interviews: 120,
//     offersAnticipated: 95,
//     offersExtended: 100,
//   };
//   redraw();
// }, 1000);
