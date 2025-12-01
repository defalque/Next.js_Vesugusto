import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";

import { CheckIcon } from "lucide-react";
import { useFormButtonsContext } from "@/app/_contexts/FormButtonsContext";

function FormButtons({
  shouldReduce,
  defaultText,
  pendingText,
  successText,
  disabled,
  widths,
}) {
  const { buttonState } = useFormButtonsContext();

  const option = {
    idle: <span>{defaultText}</span>,
    loading: (
      <>
        <span
          aria-hidden
          className="animate-spin-fast block h-4 w-4 rounded-full border-2 border-t-2 border-white border-t-transparent duration-100"
        />
        <span>{pendingText}</span>
      </>
    ),
    success: (
      <>
        <CheckIcon aria-hidden className="size-4 fill-transparent text-white" />
        <span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {successText}
        </span>
      </>
    ),
  };

  return (
    <m.div
      layout
      className="col-span-full mt-5 flex flex-col gap-4 text-base sm:flex-row sm:gap-2"
    >
      <m.button
        whileTap={{ scale: shouldReduce ? 1 : 0.9 }}
        transition={{ type: "spring", duration: shouldReduce ? 0 : 0.3 }}
        style={{ borderRadius: 9999 }}
        initial={{
          width:
            buttonState === "idle"
              ? widths.idle
              : buttonState === "loading"
                ? widths.loading
                : widths.success,
        }}
        animate={{
          width:
            buttonState === "idle"
              ? widths.idle
              : buttonState === "loading"
                ? widths.loading
                : widths.success,
        }}
        type="submit"
        className="bg-primary-dark-200/90 dark:hover:bg-primary-950/65 dark:bg-primary-950/80 hover:bg-primary-dark-200/75 disabled:hover:bg-primary-dark-200/90 dark:disabled:hover:bg-primary-950/80 focus-style-button cursor-pointer gap-2 self-baseline text-center font-medium text-white shadow-sm transition-colors duration-200 disabled:cursor-not-allowed sm:self-auto"
        disabled={disabled}
      >
        <AnimatePresence initial={false} mode="wait">
          <m.div
            key={buttonState}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-2 px-4 py-2"
          >
            {option[buttonState]}
          </m.div>
        </AnimatePresence>
      </m.button>
    </m.div>
  );
}

export default FormButtons;

// import * as m from "motion/react-m";
// import { AnimatePresence } from "motion/react";
// import { useReducedMotion } from "@/app/_hooks/useReducedMotion";

// import { CheckIcon } from "lucide-react";
// import { useFormButtonsContext } from "@/app/_contexts/FormButtonsContext";
// import useMeasure from "react-use-measure";

// function FormButtons({
//   defaultText,
//   pendingText,
//   successText,
//   disabled,
//   // onReset,
//   // onClick,
// }) {
//   const { buttonState } = useFormButtonsContext();
//   // const [ref, bounds] = useMeasure();
//   // console.log(bounds);

//   const option = {
//     idle: (
//       <m.button
//         layoutId="button"
//         whileTap={{ scale: 0.9 }}
//         style={{ borderRadius: 9999 }}
//         type="submit"
//         className="bg-primary-dark-200/90 dark:hover:bg-primary-950/65 dark:bg-primary-950/80 hover:bg-primary-dark-200/75 disabled:hover:bg-primary-dark-200/90 dark:disabled:hover:bg-primary-950/80 focus-style-button _rounded-full flex cursor-pointer items-center justify-center gap-2 self-baseline px-4 py-2 text-center font-medium text-white shadow-sm transition-colors duration-200 disabled:cursor-not-allowed sm:self-auto"
//         disabled={disabled}
//       >
//         <m.span
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//         >
//           {defaultText}
//         </m.span>
//       </m.button>
//     ),
//     loading: (
//       <m.button
//         layoutId="button"
//         whileTap={{ scale: 0.9 }}
//         style={{ borderRadius: 9999 }}
//         type="submit"
//         className="bg-primary-dark-200/90 dark:hover:bg-primary-950/65 dark:bg-primary-950/80 hover:bg-primary-dark-200/75 disabled:hover:bg-primary-dark-200/90 dark:disabled:hover:bg-primary-950/80 focus-style-button _rounded-full flex cursor-pointer items-center justify-center gap-2 self-baseline px-4 py-2 text-center font-medium text-white shadow-sm transition-colors duration-200 disabled:cursor-not-allowed sm:self-auto"
//         disabled={disabled}
//       >
//         <span
//           aria-hidden
//           className="animate-spin-fast block h-4 w-4 rounded-full border-2 border-t-2 border-white border-t-transparent duration-100"
//         />
//         <m.span
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//         >
//           {pendingText}
//         </m.span>
//       </m.button>
//     ),
//     success: (
//       <m.button
//         layoutId="button"
//         whileTap={{ scale: 0.9 }}
//         style={{ borderRadius: 9999 }}
//         type="submit"
//         className="bg-primary-dark-200/90 dark:hover:bg-primary-950/65 dark:bg-primary-950/80 hover:bg-primary-dark-200/75 disabled:hover:bg-primary-dark-200/90 dark:disabled:hover:bg-primary-950/80 focus-style-button _rounded-full flex cursor-pointer items-center justify-center gap-2 self-baseline px-4 py-2 text-center font-medium text-white shadow-sm transition-colors duration-200 disabled:cursor-not-allowed sm:self-auto"
//         disabled={disabled}
//       >
//         <CheckIcon aria-hidden className="size-4 fill-transparent text-white" />
//         <m.span
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//         >
//           {successText}
//         </m.span>
//       </m.button>
//     ),
//   };

//   return (
//     <m.div
//       layout
//       className="col-span-full mt-5 flex flex-col gap-4 text-base sm:flex-row sm:gap-2"
//     >
//       {/* <m.button
//         whileTap={{ scale: 0.9 }}
//         transition={{ type: "spring", duration: 0.3 }}
//         style={{ borderRadius: 9999 }}
//         type="submit"
//         className="bg-primary-dark-200/90 dark:hover:bg-primary-950/65 dark:bg-primary-950/80 hover:bg-primary-dark-200/75 disabled:hover:bg-primary-dark-200/90 dark:disabled:hover:bg-primary-950/80 focus-style-button _rounded-full flex cursor-pointer items-center justify-center gap-2 self-baseline px-4 py-2 text-center font-medium text-white shadow-sm transition-colors duration-200 disabled:cursor-not-allowed sm:self-auto"
//         disabled={disabled}
//       > */}
//       <AnimatePresence initial={false} mode="popLayout">
//         {/* <m.div
//             key={buttonState}
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="flex items-center justify-center gap-2 px-4 py-2"
//           > */}
//         {option[buttonState]}
//         {/* </m.div> */}
//       </AnimatePresence>
//       {/* </m.button> */}
//     </m.div>
//   );
// }

// export default FormButtons;

// ref={ref}
// animate={{
//   width:
//     buttonState === "idle"
//       ? 160
//       : buttonState === "loading"
//         ? 195
//         : 198,
// }}
// animate={{ width: bounds.width }}
