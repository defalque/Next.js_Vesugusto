"use client";

import { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";

function HeartBurstButton() {
  const [hearts, setHearts] = useState([]);

  const handleClick = () => {
    const newHearts = Array.from({ length: 3 }, () => ({
      id: Date.now() + Math.random(), // id pseudo-unico
      xOffset: Math.random() * 40 - 20,
    }));

    setHearts((prev) => [...prev, ...newHearts]);

    // Cleanup dopo animazione
    setTimeout(() => {
      setHearts((prev) => prev.slice(newHearts.length));
    }, 600);
  };

  return (
    <div className="relative">
      <div
        className="px-3 py-3 bg-primary-100 rounded-full cursor-pointer"
        onClick={handleClick}
      >
        <HeartIcon className="size-6 text-primary-dark-900 hover:fill-primary-950 hover:text-primary-950" />
      </div>

      {hearts.map((heart) => (
        <HeartIcon
          key={heart.id}
          className={`size-5 text-primary-950 fill-primary-950 pointer-events-none absolute left-1/2 top-1/2 animate-fly-up`}
          style={{
            transform: `translate(-50%, -50%) translateX(${heart.xOffset}px)`,
          }}
        />
      ))}
    </div>
  );
}

export default HeartBurstButton;
