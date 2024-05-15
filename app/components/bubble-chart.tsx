import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface CryptoData {
  name: string;
  symbol: string;
  logo: string;
  price: number | string; 
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface BubbleChartProps {
  cryptoData: CryptoData[];
}

export default function BubbleChart(props: BubbleChartProps) {
  const d3ContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!d3ContainerRef.current) return;

    const width = d3ContainerRef.current?.offsetWidth;
    const height = d3ContainerRef.current?.offsetHeight;

    const minBubbleSize = 30;
    const maxBubbleSize = 70;

    const minX = 0.06 * width;
    const maxX = 0.98 * width;
    const minY = 0.15 * height;
    const maxY = 0.87 * height;

    const svg = d3
      .select(d3ContainerRef.current)
      .append("svg")
      .classed("bg-transparent", true);

    const updateViewBox = () => {
      const width = d3ContainerRef.current?.offsetWidth;
      const height = d3ContainerRef.current?.offsetHeight;
      svg.attr("viewBox", `0 0 ${width} ${height}`);
    };

    updateViewBox();
    window.addEventListener("resize", updateViewBox);

    const bubbleSizeScale = d3
      .scaleLinear()
      .domain([
        d3.min(props.cryptoData, (d: any) => d.price || 0), 
        d3.max(props.cryptoData, (d: any) => d.price || 0), 
      ])
      .range([minBubbleSize, maxBubbleSize]);

    const simulation = d3.forceSimulation<CryptoData>(Object.values(props.cryptoData))
      .force("collide", d3.forceCollide<CryptoData>().radius((d: any) => bubbleSizeScale(Math.abs(d.price || 0)) + 2).strength(1))
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05));

   
    props.cryptoData.forEach((crypto) => {
      const randomX = Math.random() < 0.5 ? -100 : width + 100;
      const randomY = Math.random() * height;
      
      crypto.x = randomX;
      crypto.y = randomY;
    });

    const node = svg
      .selectAll("g")
      .data(props.cryptoData)
      .enter()
      .append("g")
      .attr("transform", (d: any) => `translate(${d.x},${d.y})`);

    node
      .append("circle")
      .attr("r", (d: any) => bubbleSizeScale(Math.abs(d.price || 0))) 
      .style(
        "fill",
        (d: any) =>
          d.price !== null && d.price >= 0 
            ? "rgba(98, 222, 147, 0.1)"
            : "rgba(255, 99, 132, 0.1)"
      )
      .attr("stroke", (d: any) =>
        d.price !== null && d.price >= 0 
          ? "rgba(98, 222, 148, 0.9)"
          : "rgba(255, 99, 132, 0.9)"
      )
      .attr("data-name", (d: any) => d.name)
      .style("strokeWidth", 4)
      .attr("data-value", (d: any) => d.price) 
      .on("click", function () {
        const name = d3.select(this).attr("data-name");
        window.location.href = `https://www.coingecko.com/en/coins/${name
          .toLowerCase()
          .replace(/\s/g, "-")}`;
      })
      .on("mouseover", function () {
        const value = parseFloat(d3.select(this).attr("data-value") || "0");
        const circles = svg.selectAll("g");
        circles.style("opacity", function (d: any) {
          return value >= 0 && d.price >= 0 || value < 0 && d.price < 0 ? 40 : 0.2; 
        });
      })
      .on("mouseout", function () {
        svg.selectAll("circle").style("opacity", 1);
      });

    node
      .append("image")
      .attr("xlink:href", (d: any) => d.logo)
      .attr("x", (d: any) => -bubbleSizeScale(Math.abs(d.price || 0)) * 0.45) 
      .attr("y", (d: any) => -bubbleSizeScale(Math.abs(d.price || 0)) * 0.9) 
      .attr("width", (d: any) => bubbleSizeScale(Math.abs(d.price || 0)) * 0.9) 
      .attr("height", (d: any) => bubbleSizeScale(Math.abs(d.price || 0)) * 1); 

    node
      .append("text")
      .attr("x", 0)
      .attr("y", (d: any) => bubbleSizeScale(Math.abs(d.price || 0)) / 3) 
      .attr("text-anchor", "middle")
      .style("font-size", (d: any) => `${bubbleSizeScale(Math.abs(d.price || 0)) / 3}px`) 
      .style("font-weight", "bold")
      .style("fill", "white")
      .text((d: any) => d.symbol);

    node
      .append("text")
      .attr("x", 0)
      .attr("y", (d: any) => bubbleSizeScale(Math.abs(d.price || 0)) / 2 + 10) 
      .attr("text-anchor", "middle")
      .style("font-size", (d: any) => `${bubbleSizeScale(Math.abs(d.price || 0)) / 4}px`) 
      .style("font-weight", "bold")
      .text((d: any) => {
        const percentage = Math.round((d.price || 0) * 100); 
        return `${(percentage / 100).toFixed(2)}%`;
      })
      .style("fill", (d: any) => (d.price !== null && d.price >= 0 ? "green" : "red")); 

    node
      .call(
        d3
          .drag<SVGGElement, CryptoData>()
          .on("start", (event: any, d: any) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x!;
            d.fy = d.y!;
          })
          .on("drag", (event: any, d: any) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event: any, d: any) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      )
      .call((node: any) =>
        node
          .append("title")
          .text((d: any) => `Symbol: ${d.symbol}, LatestH1: ${d.price}`) 
      );

    simulation.nodes(props.cryptoData).on("tick", () => {
      node.attr("transform", (d: any) => {
        d.x = Math.max(minX, Math.min(maxX, d.x!));
        d.y = Math.max(minY, Math.min(maxY, d.y!));
        return `translate(${d.x},${d.y})`;
      });
    });

    return () => {
      window.removeEventListener("resize", updateViewBox);
      svg.remove();
    };
  }, [d3ContainerRef, props.cryptoData]);

  return (
    <div className="bg-transparent h-[74vh]" ref={d3ContainerRef}></div>
  );
}