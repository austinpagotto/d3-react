import React, { useEffect, useRef } from "react";
import { select, scaleLinear, line, max, curveCardinal } from "d3";
import useResizeObserver from "./useResizeObserver";

function Finale({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    svg
      .selectAll(".circle1")
      .data(data)
      .join("circle") // returns a selection for both entering/updating circles, removes unnecessary circles
      .attr("class", "circle1")
      .attr("fill", "orange")
      .attr("cx", (value, index) => index * 20)
      .attr("cy", 10)
      .attr("r", 5);

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);

    const yScale = scaleLinear()
      .domain([0, max(data)])
      .range([height, 0]);

    const lineGenerator = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);

      svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("d", lineGenerator);
  }, [data, dimensions]);

  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  );
}

export default Finale;
