import React, { useRef, useEffect, useState } from "react";
import {
  select,
  scaleLinear,
  line,
  max,
  curveCardinal,
  axisBottom,
  axisLeft,
  brushX,
  event,
} from "d3";
import useResizeObserver from "./useResizeObserver";
import usePrevious from "./usePrevious";

function BrushChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selection, setSelection] = useState([0, 1.5]);
  const previousSelection = usePrevious(selection);

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const Xscale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);
    const Yscale = scaleLinear()
      .domain([0, max(data)])
      .range([height, 0]);

    const lineGenerator = line()
      .x((d, index) => Xscale(index))
      .y((d) => Yscale(d))
      .curve(curveCardinal);

    svg
      .selectAll(".myLine")
      .data([data])
      .join("path")
      .attr("class", "myLine")
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("d", lineGenerator);

    svg
      .selectAll(".myDot")
      .data(data)
      .join("circle")
      .attr("class", "myDot")
      .attr("stroke", "black")
      .attr("r", (value,index)=>index >= selection[0] && index <= selection[1]?4:2)
      .attr("fill", (value,index)=>index >= selection[0] && index <= selection[1]?'white':'black')
      .attr("cx", (value, index) => Xscale(index))
      .attr("cy", Yscale);

    const xAxis = axisBottom(Xscale);

    svg
      .select(".x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);
    const yAxis = axisLeft(Yscale);
    svg.select(".y-axis").call(yAxis);

    const brush = brushX()
      .extent([
        [0, 0],
        [width, height],
      ])
      .on("start brush end", () => {
        if (event.selection) {
          const indexSelection = event.selection.map(Xscale.invert);
          setSelection(indexSelection)
        }
      });

    if (previousSelection === selection) {
      svg.select(".brush").call(brush).call(brush.move, selection.map(Xscale));
    }
  }, [data, dimensions, selection,previousSelection]);
  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
          <g className="brush" />
        </svg>
      </div>
      <small style={{ marginBottom: "1rem" }}>{data.filter((value,index)=>index >= selection[0] && index <= selection[1]).join(', ')}</small>
    </React.Fragment>
  );
}

export default BrushChart;
