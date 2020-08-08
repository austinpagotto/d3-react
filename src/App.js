import React, { useRef, useEffect, useState } from "react";
// import Face from './reactFace/Face'
import "./App.css";
import { select } from "d3";

function App() {
  const svgRef = useRef();
  const svgRef2 = useRef();
  const [data, setData] = useState([23, 30, 45, 60, 15]);

  useEffect(() => {
    console.log(svgRef);
    const svg = select(svgRef.current);
    const svg2 = select(svgRef2.current);
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", (value) => value)
      .attr("cx", (value) => value * 2)
      .attr("cy", (value) => value * 2)
      .attr("stroke", "red");
      svg2
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", (value) => value)
      .attr("cx", (value) => value * 2)
      .attr("cy", (value) => value * 2)
      .attr("stroke", "red");
  }, [data]);
  return (
    <div className="App">
      <svg ref={svgRef}></svg>
      <button onClick={() => setData(data.map((value) => value + 5))}>
        Update Data
      </button>
      <button onClick={() => setData(data.filter(value => value <= 35))}>
        Filter Data
      </button>
      <svg ref={svgRef2}></svg>
      {/* <Face/> */}
    </div>
  );
}

export default App;
