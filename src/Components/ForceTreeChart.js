import React, { useRef, useEffect } from "react";
import {
  select,
  hierarchy,
  forceSimulation,
  forceCenter,
  forceManyBody,
  mouse,
  forceX,
  forceY,
  forceCollide,
  forceRadial,
} from "d3";
import useResizeObserver from "./useResizeObserver";

function ForceTreeChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    if (!dimensions) return;
    const svg = select(svgRef.current);

    // svg.attr('viewBox',[
    //     -dimensions.width/2,
    //     -dimensions.height/2,
    //     dimensions.width,
    //     dimensions.height
    // ])

    const root = hierarchy(data);
    const nodeData = root.descendants();
    const linkData = root.links();

    const simulation = forceSimulation(nodeData)
    //   .force("center", forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force("charge", forceManyBody().strength(-30))
      .force("collide", forceCollide(30))
      .on("tick", () => {
        svg
          .selectAll(".link")
          .data(linkData)
          .join("line")
          .attr("class", "link")
          .attr("stroke", "black")
          .attr("fill", "none")
          .attr("x1", (link) => link.source.x)
          .attr("y1", (link) => link.source.y)
          .attr("x2", (link) => link.target.x)
          .attr("y2", (link) => link.target.y);

        svg
          .selectAll(".node")
          .data(nodeData)
          .join("circle")
          .attr("class", "node")
          .attr("r", 4)
          .attr("cx", (node) => node.x)
          .attr("cy", (node) => node.y);

        svg
          .selectAll(".label")
          .data(nodeData)
          .join("text")
          .attr("class", "label")
          .attr("text-anchor", "middle")
          .attr("font-size", 20)
          .text((node) => node.data.name)
          .attr("x", (node) => node.x)
          .attr("y", (node) => node.y);
      });

    svg.on("mousemove", () => {
      const [x, y] = mouse(svgRef.current);
      simulation
        .force(
          "x",
          forceX(x).strength((node) => 0.2 + node.depth * 0.15)
        )
        .force(
          "y",
          forceY(y).strength((node) => 0.2 + node.depth * 0.15)
        );
    });

    svg.on("click", () => {
      const [x, y] = mouse(svgRef.current);
      simulation.alpha(0.5).restart().force("orbit", forceRadial(100, x, y).strength(0.8));

      svg
        .selectAll(".orbit")
        .data([data])
        .join("circle")
        .attr("class", "orbit")
        .attr("stroke", "green")
        .attr("fill", "none")
        .attr("r", 100)
        .attr("cx", x)
        .attr("cy", y);
    });
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default ForceTreeChart;
