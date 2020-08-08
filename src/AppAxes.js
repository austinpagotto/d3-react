import React, { useRef, useEffect, useState } from "react";
// import Face from './reactFace/Face'
import "./App.css";
import { select, line, curveCardinal, axisBottom, scaleLinear,axisRight } from "d3";

function AppAxes() {
  const svgRef = useRef();
  const [data, setData] = useState([23, 30, 45, 60, 15, 65, 70]);

  useEffect(() => {
    console.log(svgRef);
    const svg = select(svgRef.current);

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);
    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

    const xAxis = axisBottom(xScale).ticks(data.length).tickFormat(index => index+1);
    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);

    const yAxis = axisRight(yScale)
    svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr('class','line')
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);
  return (
    <div className="App">
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <br></br>
      <br></br>
      <br></br>
      <button onClick={() => setData(data.map((value) => value + 5))}>
        Update Data
      </button>
      <button onClick={() => setData(data.filter((value) => value <= 35))}>
        Filter Data
      </button>
      {/* <Face/> */}
    </div>
  );
}

export default AppAxes;
