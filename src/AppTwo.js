import React, { useRef, useEffect, useState } from "react";
// import Face from './reactFace/Face'
import "./App.css";
import { select, line,curveCardinal } from "d3";

function AppTwo() {
  const svgRef = useRef();
  const [data, setData] = useState([23, 30, 45, 60, 15,65,70]);

  useEffect(() => {
    console.log(svgRef);
    const svg = select(svgRef.current);
    const myLine = line()
      .x((value, index) => index * 50)
      .y((value) => 150-value)
      .curve(curveCardinal);
    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", (value) => myLine(value))
      .attr('fill','none')
      .attr('stroke','blue')
  }, [data]);
  return (
    <div className="App">
      <svg ref={svgRef}></svg>
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

export default AppTwo;
