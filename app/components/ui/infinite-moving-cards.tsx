"use client";

import React, { useEffect, useState } from "react";
import { cn } from "~/utils/cn";
import { CardBody, CardContainer, CardItem } from "./3d-card";
import { Link } from "@remix-run/react";

export const InfiniteMovingCards = ({
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);
  const [isPaused, setIsPaused] = useState(false);

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
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-duration",
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"
      );
    }
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-[78vw] overflow-hidden",
        "[mask-image:linear-gradient(to right, transparent, white 20%, white 80%, transparent)]",
        isPaused ? "paused" : ""
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll"
        )}
        style={{ animationPlayState: isPaused ? "paused" : "running" }}
      >
        {Array.from({ length: 5 }).map((_, idx) => (
          <li
            className="w-[350px] max-w-full relative rounded-2xl flex-shrink-0 px-8 py-6 md:w-[450px]"
            key={idx}
          >
            <CardContainer className="inter-var h-full w-full">
              <CardBody
                className="bg-[#3b3b3b] relative group/card hover:shadow-2xl hover:shadow-blue-500/[0.3] dark:bg-black w-auto h-full rounded-xl p-6 border flex flex-col items-center justify-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <CardItem translateZ="50" className="text-xl font-bold text-white">
                  Make things float in air
                </CardItem>
                <CardItem as="p" translateZ="60" className="text-gray-400 text-sm max-w-sm mt-2">
                  Hover over this card to unleash the power of CSS perspective
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <img
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
                </CardItem>
                <div className="flex justify-between items-center mt-4 w-full">
                  <CardItem
                    translateZ={20}
                    as={Link}
                    href="https://twitter.com/mannupaaji"
                    target="__blank"
                    className="px-4 py-2 rounded-xl text-xs font-normal text-white"
                  >
                    Metadata →
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-4 py-2 rounded-xl bg-[#FFD700] text-black text-xs font-bold"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    Offer Now
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </li>
        ))}
      </ul>
    </div>
  );
};
