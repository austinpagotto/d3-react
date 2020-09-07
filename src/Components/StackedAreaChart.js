import React, { useEffect, useRef } from "react";
import {
  select,
  axisBottom,
  stack,
  max,
  scaleLinear,
  axisLeft,
  stackOrderAscending,
  area,
  scalePoint,
  curveCardinal,
} from "d3";
import useResizeObserver from "./useResizeObserver";

function StackedAreaChart({ data, keys, colors }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const stackGenerator = stack().keys(keys).order(stackOrderAscending);
    const layers = stackGenerator(data);
    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1])),
    ];
    console.log(extent);

    const xScale = scalePoint()
      .domain(data.map((d) => d.year))
      .range([0, width]);

    const xAxis = axisBottom(xScale);

    const yScale = scaleLinear().domain(extent).range([height, 0]);
    const yAxis = axisLeft(yScale);

    const areaGenerator = area()
      .x((sequence) => xScale(sequence.data.year))
      .y0((sequence) => yScale(sequence[0]))
      .y1((sequence) => yScale(sequence[1]))
      .curve(curveCardinal);

    svg
      .selectAll(".layer")
      .data(layers)
      .join("path")
      .attr("fill", (layer) => {
        return colors[layer.key];
      })
      .attr("class", "layer")
      .attr("d", areaGenerator);

    svg
      .select(".x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);
    svg.select(".y-axis").call(yAxis);
  }, [colors, data, dimensions, keys]);

  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>
          <g className="x-axis"></g>
          <g className="y-axis"></g>
        </svg>
      </div>
    </React.Fragment>
  );
}

export default StackedAreaChart;
