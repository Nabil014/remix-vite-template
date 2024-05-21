import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface CryptoData {
  name: string;
  symbol: string;
  logo: string;
  price: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface BubbleChartProps {
  cryptoData: CryptoData[];
}

export default function BubbleChart(props: BubbleChartProps) {
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeListener = () => {
      renderChart();
    };

    window.addEventListener('resize', resizeListener);

    renderChart();

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [props.cryptoData]);

  const renderChart = () => {
    if (outputRef.current) {
      const width = outputRef.current.clientWidth;
      const height = outputRef.current.clientHeight;

      const isMobile = width < 768;
      const minBubbleSize = isMobile ? 20 : 20;
      const maxBubbleSize = isMobile ? 50 : 70;
      const threshold = 30;

      d3.select(outputRef.current).select("svg").remove();

      const svg = d3
        .select(outputRef.current)
        .append("svg")
        .classed("w-full h-full", true)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

      const defs = svg.append("defs");

      const createGradient = (id: string, color: string) => {
        const gradient = defs.append("radialGradient")
          .attr("id", id)
          .attr("cx", "50%")
          .attr("cy", "50%")
          .attr("r", "50%")
          .attr("fx", "50%")
          .attr("fy", "50%");

        gradient.append("stop")
          .attr("offset", "0%")
          .attr("style", `stop-color:${color}; stop-opacity:0.5`);

        gradient.append("stop")
          .attr("offset", "100%")
          .attr("style", `stop-color:${color}; stop-opacity:0`);
      };

      createGradient("positiveGradient", "rgba(98, 222, 147, 1)");
      createGradient("negativeGradient", "rgba(255, 99, 132, 1)");

      const filter = defs.append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "130%");

      filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 5)
        .attr("result", "blur");

      filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 0)
        .attr("dy", 3)
        .attr("result", "offsetBlur");

      const feMerge = filter.append("feMerge");
      feMerge.append("feMergeNode").attr("in", "offsetBlur");
      feMerge.append("feMergeNode").attr("in", "SourceGraphic");

      const scaleSize = d3.scaleSqrt()
        .domain([d3.min(props.cryptoData, d => d.price) || 0, d3.max(props.cryptoData, d => d.price) || 1])
        .range([minBubbleSize, maxBubbleSize]);

      props.cryptoData.forEach((d) => {
        d.x = Math.random() * width;
        d.y = Math.random() * height;
      });

      const simulation = d3
        .forceSimulation<CryptoData>(props.cryptoData)
        .force("collide", d3.forceCollide<CryptoData>().radius(d => scaleSize(d.price) + 10).strength(1))
        .force("center", d3.forceCenter(width / 2, height / 2).strength(0.01))
        .force("x", d3.forceX(width / 2).strength(0.01))
        .force("y", d3.forceY(height / 2).strength(0.01))
        .force("charge", d3.forceManyBody().strength(-30))
        .alphaTarget(0.3)
        .restart();

      const node = svg.selectAll("g").data(props.cryptoData).enter().append("g");

      node
        .append("circle")
        .attr("r", d => scaleSize(d.price))
        .style("fill", (d: any) =>
          d.price !== null && d.price >= 0
            ? "url(#positiveGradient)"
            : "url(#negativeGradient)"
        )
        .attr("stroke", (d: any) =>
          d.price !== null && d.price >= 0
            ? "rgba(98, 222, 148, 0.9)"
            : "rgba(255, 99, 132, 0.9)"
        )
        .style("stroke-width", 4)
        .style("filter", "url(#drop-shadow)")
        .attr("data-name", (d: any) => d.name)
        .attr("data-value", (d: any) => d.price)
        .on("click", function () {
          const name = d3.select(this).attr("data-name");
          window.location.href = `https://www.coingecko.com/en/coins/${name.toLowerCase().replace(/\s/g, "-")}`;
        })
        .on("mouseover", function (event, d) {
          const isPositive = d.price >= 0;
          node.selectAll("circle")
            .transition()
            .duration(200)
            .style("opacity", function (d2: any) {
              return (isPositive && d2.price >= 0) || (!isPositive && d2.price < 0) ? 1 : 0.2;
            });

          node.selectAll("image, text")
            .transition()
            .duration(200)
            .style("opacity", function (d2: any) {
              return (isPositive && d2.price >= 0) || (!isPositive && d2.price < 0) ? 1 : 0.2;
            });
        })
        .on("mouseout", function () {
          node.selectAll("circle, image, text")
            .transition()
            .duration(200)
            .style("opacity", 1);
        });

      node.each(function (d) {
        const group = d3.select(this);
        const bubbleSize = scaleSize(d.price);
        if (bubbleSize > threshold) {
          group.append("image")
            .attr("xlink:href", d.logo)
            .attr("x", -bubbleSize * 0.45)
            .attr("y", -bubbleSize * 0.9)
            .attr("width", bubbleSize * 0.9)
            .attr("height", bubbleSize * 0.9);

          group.append("text")
            .attr("x", 0)
            .attr("y", bubbleSize / 4)
            .attr("text-anchor", "middle")
            .style("font-size", `${bubbleSize / 3}px`)
            .style("font-weight", "bold")
            .style("fill", "white")
            .text(d.symbol);

          group.append("text")
            .attr("x", 0)
            .attr("y", bubbleSize / 2 + 10)
            .attr("text-anchor", "middle")
            .style("font-size", `${bubbleSize / 4}px`)
            .style("font-weight", "bold")
            .text(() => {
              const percentage = Math.round((d.price || 0) * 100);
              return `${(percentage / 100).toFixed(2)}%`;
            })
            .style("fill", d.price !== null && d.price >= 0 ? "green" : "red");
        } else {
          group.append("image")
            .attr("xlink:href", d.logo)
            .attr("x", -bubbleSize * 0.5)
            .attr("y", -bubbleSize * 0.5)
            .attr("width", bubbleSize)
            .attr("height", bubbleSize);
        }
      });

      node
        .call(
          d3
            .drag<SVGGElement, CryptoData>()
            .on("start", (event, d) => {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x!;
              d.fy = d.y!;
            })
            .on("drag", (event, d) => {
              d.fx = event.x;
              d.fy = event.y;
            })
            .on("end", (event, d) => {
              if (!event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            })
        )
        .call((node) =>
          node
            .append("title")
            .text((d) => `Symbol: ${d.symbol}, Price: ${d.price}`)
        );

      simulation.nodes(props.cryptoData).on("tick", () => {
        node.attr("transform", (d) => {
          const minX = 0.06 * width;
          const maxX = 0.98 * width;
          const minY = 0.15 * height;
          const maxY = 0.87 * height;
          d.x = Math.max(minX, Math.min(maxX, d.x!));
          d.y = Math.max(minY, Math.min(maxY, d.y!));
          return `translate(${d.x},${d.y})`;
        });
      });

      return () => {
        svg.remove();
      };
    }
  };

  return <div ref={outputRef} className="h-[74vh] w-full"></div>;
}
