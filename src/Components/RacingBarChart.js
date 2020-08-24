import React, { useRef, useEffect } from "react";
import { select, scaleBand, scaleLinear, max } from "d3";
import useResizeObserver from "./useResizeObserver";

function RacingBarChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    data.sort((a, b) => b.value - a.value);

    const Yscale = scaleBand()
      .paddingInner(0.1)
      .domain(data.map((value, index) => index))
      .range([0, dimensions.height]);

    const Xscale = scaleLinear()
      .domain([0, max(data, (entry) => entry.value)])
      .range([0, dimensions.width]);

    svg
      .selectAll(".bar")
      .data(data, (entry, index) => entry.name)
      .join((enter) =>
        enter.append("rect").attr("y", (entry, index) => Yscale(index))
      )
      .attr("fill", (entry) => entry.color)
      .attr("class", "bar")
      .attr("x", 0)
      .attr("height", Yscale.bandwidth())
      .transition()
      .attr("width", (entry) => Xscale(entry.value))
      .attr("y", (entry, index) => Yscale(index));

    svg
      .selectAll(".label")
      .data(data, (entry, index) => entry.name)
      .join((enter)=>enter.append('text').attr("y", (entry, index) => Yscale(index) + Yscale.bandwidth()))
      .text((entry) => `🐎 ... ${entry.name} (${entry.value} meters)`)
      .attr("class", "label")
      .attr("x", 10)
      .transition()
      .attr("y", (entry, index) => Yscale(index) + Yscale.bandwidth());
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default RacingBarChart;
