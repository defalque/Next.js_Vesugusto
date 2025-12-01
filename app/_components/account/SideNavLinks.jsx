"use client";

import * as m from "motion/react-m";

const userVariants = {
  initial: { y: 0 },
  animate: { y: [0, -6, 0, -5, 0, -3, 0, -1, 0] },
};

const heartVariants = {
  initial: { scale: 1 },
  animate: { scale: [1, 1.2, 0.8, 1.2, 0.8, 1] },
};

const packageCircleVariants = {
  initial: { rotate: 0 },
  animate: { x: 5, y: -0.5 },
};

const packageLineVariants = {
  initial: { rotate: 0 },
  animate: { rotate: 90 },
};

const giftVariants = {
  initial: { rotate: 0 },
  animate: {
    rotate: [null, -8, -3, 8, 5, 3, 0, -3, -6, -3, 0],
    y: [null, -2, -1, 0],
  },
};

const giftCapVariants = {
  initial: { y: 0, rotate: 0 },
  animate: {
    y: [null, -2, -1, 0],
    rotate: [null, -8, -3, 8, 5, 3, 0, 1, 0],
  },
};

const cogVariants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 180,
  },
};

const questionMarkCircleVariants = {
  initial: { rotate: 0 },
  animate: { rotate: -90 },
};

export const navLinks = [
  {
    name: "Il mio profilo",
    href: "/account",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-user-icon lucide-user size-5.5 overflow-visible md:size-4.5"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <m.circle
          cx="12"
          cy="7"
          r="4"
          variants={userVariants}
          transition={{ duration: 1.2 }}
        />
      </svg>
    ),
  },
  {
    name: "I miei ordini",
    href: "/account/orders",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-package-search-icon lucide-package-search size-5.5 overflow-visible md:size-4.5"
      >
        <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
        <path d="m7.5 4.27 9 5.15" />
        <polyline points="3.29 7 12 12 20.71 7" />
        <line x1="12" x2="12" y1="22" y2="12" />
        <m.circle
          cx="18.5"
          cy="15.5"
          r="2.5"
          variants={packageCircleVariants}
          transition={{ duration: 0.2 }}
        />
        <m.path
          d="M20.27 17.27 22 19"
          variants={packageLineVariants}
          transition={{ duration: 0.2 }}
        />
      </svg>
    ),
  },
  {
    name: "I miei preferiti",
    href: "/account/favorites",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-heart-icon lucide-heart size-5.5 overflow-visible md:size-4.5"
      >
        <m.path
          d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
          variants={heartVariants}
          transition={{ duration: 1.5 }}
        />
      </svg>
    ),
  },
  {
    name: "Carte regalo e buoni",
    href: "/account/gift-cards",
    icon: (
      <m.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-gift-icon lucide-gift size-5.5 md:size-4.5"
        variants={giftVariants}
        transition={{ duration: 0.4 }}
      >
        <m.rect
          x="3"
          y="8"
          width="18"
          height="4"
          rx="1"
          variants={giftCapVariants}
          transition={{ duration: 0.4 }}
        />
        <path d="M12 8v13" />
        <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
        <m.path
          d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"
          variants={giftCapVariants}
          transition={{ duration: 0.4 }}
        />
      </m.svg>
    ),
  },
  {
    name: "Preferenze",
    href: "/account/preferences",
    icon: (
      <m.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-cog-icon lucide-cog size-5.5 md:size-4.5"
        variants={cogVariants}
        transition={{ duration: 0.45 }}
      >
        <path d="M11 10.27 7 3.34" />
        <path d="m11 13.73-4 6.93" />
        <path d="M12 22v-2" />
        <path d="M12 2v2" />
        <path d="M14 12h8" />
        <path d="m17 20.66-1-1.73" />
        <path d="m17 3.34-1 1.73" />
        <path d="M2 12h2" />
        <path d="m20.66 17-1.73-1" />
        <path d="m20.66 7-1.73 1" />
        <path d="m3.34 17 1.73-1" />
        <path d="m3.34 7 1.73 1" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="12" cy="12" r="8" />
      </m.svg>
    ),
  },
  {
    name: "Supporto clienti",
    href: "/account/customer-service",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-message-circle-question-mark-icon lucide-message-circle-question-mark size-5.5 overflow-visible md:size-4.5"
      >
        <m.path
          d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"
          variants={questionMarkCircleVariants}
          transition={{ duration: 0.3 }}
        />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
];
