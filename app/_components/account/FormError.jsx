import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/app/_hooks/useReducedMotion";
import { CircleAlert } from "lucide-react";

export default function FormError({ message, id }) {
  // if (!message) return null;

  return (
    <AnimatePresence mode="wait">
      {message && (
        <m.div
          layout
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          id={id}
          role="alert"
          className="relative z-10 flex max-w-sm items-start gap-2 overflow-hidden rounded-full bg-red-500/15 p-2 px-3 text-xs text-red-500 sm:text-sm"
        >
          <CircleAlert aria-hidden="true" className="size-5 shrink-0" />
          <m.span
            layout="position"
            className="self-center font-medium hyphens-auto"
          >
            {message}
          </m.span>
        </m.div>
      )}
    </AnimatePresence>
  );
}
