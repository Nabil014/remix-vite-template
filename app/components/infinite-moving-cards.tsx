import React, { useEffect, useState } from "react";
import { cn } from "~/utils/cn";

export const InfiniteMovingCards = ({
  items,
  direction = "right",
  speed = "slow",
  pauseOnHover = false,
  className,
}: {
  items: {
    token: string;
    inflow: string;
    average: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow" | "extra slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else if (speed === "slow") {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      } else if (speed === "extra slow") {
        containerRef.current.style.setProperty("--animation-duration", "100s");
      }
    }
  };

  return (
    <div className="flex flex-col p-4">
      <div
        ref={containerRef}
        className={cn(
          "scroller relative z-20 w-full max-w-7xl overflow-hidden",
          "mask-image:linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
          className
        )}
        style={{ maskImage: 'linear-gradient(to right, transparent, white 20%, white 80%, transparent)' }}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap", // Ajusta el gap entre tarjetas
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {items.map((item, idx) => (
            <li
              className="max-w-full relative flex-shrink-0"
              style={{
                width: '260px', // Ancho de la tarjeta
                height: '140px', // Altura de la tarjeta
                background: 'linear-gradient(180deg, #043234 0%, #000D0E 100%)', // Gradiente de fondo
                border: '1px solid rgba(31, 41, 55, 0.5)', // Borde tenue
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Sombra sutil
                borderRadius: '20px', // Bordes redondeados
                color: '#e5e7eb', // Color del texto principal
                padding: '24px', // Padding interno
              }}
              key={idx}
            >
              <div>
                <h3 className="relative z-20 text-lg font-bold" style={{ color: '#e5e7eb' }}>
                  {item.token}
                </h3>
                <p className="relative z-20 mt-2 text-sm" style={{ color: '#d1d5db' }}>
                  has had a CEX inflow of {item.inflow} in the last 24h ({item.average}x the recent average)
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};