"use client";

import { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { addFavorite } from "@/app/_lib/actions";
import toast, { Toaster } from "react-hot-toast";

function HeartBurstButton({ userId, productId }) {
  const [hearts, setHearts] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = async () => {
    if (userId) {
      const succes = await addFavorite(userId, productId);
      if (succes) {
        setIsClicked(true);
        const newHearts = Array.from({ length: 3 }, () => ({
          id: Date.now() + Math.random(),
          xOffset: Math.random() * 40 - 20,
        }));

        setHearts((prev) => [...prev, ...newHearts]);

        setTimeout(() => {
          setHearts((prev) => prev.slice(newHearts.length));
        }, 600);
      } else
        toast("Questo prodotto è già tra i preferiti", {
          icon: "❤️",
        });
    } else
      toast(
        "Accedi o registrati per aggiungere questo prodotto tra i preferiti",
        {
          icon: "❤️",
        }
      );
  };

  return (
    <div className="relative">
      <button
        className="px-3 py-3 bg-primary-100 dark:bg-primary-300 rounded-full cursor-pointer outline-primary-950"
        onClick={handleClick}
        disabled={isClicked}
      >
        <HeartIcon
          className={`size-6 ${
            isClicked
              ? "fill-primary-950 text-primary-950"
              : "text-primary-dark-900 hover:fill-primary-950 hover:text-primary-950"
          }`}
        />
      </button>

      {hearts.map((heart) => (
        <HeartIcon
          key={heart.id}
          className={`size-5 text-primary-950 fill-primary-950 pointer-events-none absolute left-1/2 top-1/2 animate-fly-up`}
          style={{
            transform: `translate(-50%, -50%) translateX(${heart.xOffset}px)`,
          }}
        />
      ))}
      <Toaster toastOptions={{}}></Toaster>
    </div>
  );
}

export default HeartBurstButton;
