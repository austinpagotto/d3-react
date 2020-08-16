import React, { useRef, useEffect } from "react";
import { select, arc, pie,interpolate } from "d3";
import useResizeObserver from "../ResizeObserver/useResizeObserver";

function GaugeChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    const arcGenerator = arc().innerRadius(75).outerRadius(150);

    const pieGenerator = pie()
      .startAngle(-0.5 * Math.PI)
      .endAngle(0.5 * Math.PI)
      .sort(null);
    const instructions = pieGenerator(data);

    svg
      .selectAll(".slice")
      .data(instructions)
      .join("path")
      .attr("class", "slice")
      .attr("fill", "none")
      .attr("fill", (instruction, index) => (index === 0 ? "#ffcc00" : "#eee"))
      .style(
        "transform",
        `translate(${dimensions.width / 2}px,${dimensions.height}px)`
      )
      .transition()
      .attrTween("d", function(next){
          const interpolator = interpolate(this.last,next)
          this.last = interpolator(1)
          return function(t){
              return arcGenerator(interpolator(t))
          }
      });
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}
export default GaugeChart;
