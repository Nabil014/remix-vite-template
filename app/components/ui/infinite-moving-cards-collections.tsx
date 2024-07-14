"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "~/utils/cn";
import { CardStack } from "./card-stack";

export const InfiniteMovingCardsCollections = ({
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  const addAnimation = () => {
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
  };

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
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "scroller relative z-20 max-w-[70vw] overflow-hidden",
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
          <li key={idx}>
          
              <CardStack items={CARDS} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Manu Arora",
    designation: "Senior Software Engineer",
    content: <p>These cards are amazing,</p>,
  },
  {
    id: 1,
    name: "Elon Musk",
    designation: "Senior Shitposter",
    content: <p>I don't like this Twitter thing,</p>,
  },
  {
    id: 2,
    name: "Tyler Durden",
    designation: "Manager Project Mayhem",
    content: <p>The first rule of</p>,
  },
];
