import { CircleAlert } from "lucide-react";

import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";

function FormRow({
  id,
  label,
  placeholder,
  disabled,
  errorField,
  shouldReduce,
  ...props
}) {
  return (
    <>
      <m.label
        layout="position"
        htmlFor={id}
        className="w-fit text-sm sm:text-[0.95rem]"
      >
        {label}
      </m.label>
      <m.input
        layout
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        className={`${errorField ? "border-2 border-red-500 text-red-500 placeholder:text-red-500 focus:border-red-500 focus-visible:outline-none" : "focus-style border-black/10 placeholder:text-black/30 dark:placeholder:text-white/20"} w-full rounded-lg border px-3 py-2 text-base transition-colors duration-200 disabled:animate-pulse disabled:cursor-not-allowed disabled:text-neutral-400 dark:bg-white/10 dark:disabled:text-zinc-500`}
        aria-required={true}
        aria-invalid={errorField ? "true" : "false"}
        aria-describedby={`error-${id}`}
        {...props}
      />
      <AnimatePresence mode="popLayout" initial={false}>
        {errorField && (
          <m.div
            layout
            key={errorField.message}
            initial={{ y: shouldReduce ? 0 : "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            id={`error-${id}`}
            role="alert"
            className="relative z-10 flex max-w-md items-start gap-2 overflow-hidden rounded-md bg-red-500/15 p-2 px-3 text-xs text-red-500 sm:text-sm"
          >
            <CircleAlert aria-hidden className="size-5 shrink-0" />
            <m.span layout="position" className="self-center font-medium">
              {errorField.message}
            </m.span>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default FormRow;
