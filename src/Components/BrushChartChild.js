import React, { useRef, useEffect } from "react";
import {
  select,
  scaleLinear,
  line,
  max,
  curveCardinal,
  axisBottom,
  axisLeft,
} from "d3";
import useResizeObserver from "./useResizeObserver";

function BrushChart({ data, selection, id='myClipPath' }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    const content = svg.select('.content')
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const Xscale = scaleLinear().domain(selection).range([0, width]);
    const Yscale = scaleLinear()
      .domain([0, max(data)])
      .range([height-10, 10]);

    const lineGenerator = line()
      .x((d, index) => Xscale(index))
      .y((d) => Yscale(d))
      .curve(curveCardinal);

    content
      .selectAll(".myLine")
      .data([data])
      .join("path")
      .attr("class", "myLine")
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("d", lineGenerator);

    content
      .selectAll(".myDot")
      .data(data)
      .join("circle")
      .attr("class", "myDot")
      .attr("stroke", "black")
      .attr("r", (value, index) =>
        index >= selection[0] && index <= selection[1] ? 4 : 2
      )
      .attr("fill", (value, index) =>
        index >= selection[0] && index <= selection[1] ? "white" : "black"
      )
      .attr("cx", (value, index) => Xscale(index))
      .attr("cy", Yscale);

    const xAxis = axisBottom(Xscale);

    svg
      .select(".x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);
    const yAxis = axisLeft(Yscale);
    svg.select(".y-axis").call(yAxis);
  }, [data, dimensions, selection]);
  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>
          <defs>
            <clipPath id={id}>
              <rect x="0" y="0" width="100%" height="100%" />
            </clipPath>
          </defs>
          <g className="content" clipPath={`url(#${id})`} />
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  );
}

export default BrushChart;
