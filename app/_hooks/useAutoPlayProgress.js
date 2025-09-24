// import { useCallback, useEffect, useRef, useState } from "react";

// export const useAutoplayProgress = (emblaApi, progressNode) => {
//   const [showAutoplayProgress, setShowAutoplayProgress] = useState(false);
//   const animationName = useRef("");
//   const timeoutId = useRef(0);
//   const rafId = useRef(0);

//   const startProgress = useCallback(
//     (timeUntilNext) => {
//       const node = progressNode.current;

//       if (!node) return;
//       if (timeUntilNext === null) return;

//       if (!animationName.current) {
//         const style = window.getComputedStyle(node);
//         animationName.current = style.animationName;
//       }

//       node.style.animationName = "none";
//       node.style.transform = "translate3d(0,0,0)";

//       rafId.current = window.requestAnimationFrame(() => {
//         timeoutId.current = window.setTimeout(() => {
//           node.style.animationName = animationName.current;
//           node.style.animationDuration = `${timeUntilNext}ms`;
//         }, 0);
//       });

//       setShowAutoplayProgress(true);
//     },
//     [progressNode],
//   );

//   useEffect(() => {
//     const autoplay = emblaApi?.plugins()?.autoplay;
//     if (!autoplay) return;

//     emblaApi
//       .on("autoplay:timerset", () => startProgress(autoplay.timeUntilNext()))
//       .on("autoplay:timerstopped", () => setShowAutoplayProgress(false));
//   }, [emblaApi, startProgress]);

//   useEffect(() => {
//     return () => {
//       cancelAnimationFrame(rafId.current);
//       clearTimeout(timeoutId.current);
//     };
//   }, []);

//   return {
//     showAutoplayProgress,
//   };
// };

import { useCallback, useEffect, useRef, useState } from "react";

export const useAutoplayProgress = (emblaApi, progressNode) => {
  const [showAutoplayProgress, setShowAutoplayProgress] = useState(false);
  const timeoutId = useRef(null);
  const rafId = useRef(null);

  const startProgress = useCallback(
    (timeUntilNext) => {
      const node = progressNode.current;
      if (!node) return;
      if (timeUntilNext === null) return;

      node.style.animationName = "none";
      node.style.animationDuration = "0ms";
      node.style.transform = "scaleX(0)";

      rafId.current = window.requestAnimationFrame(() => {
        timeoutId.current = window.setTimeout(() => {
          node.style.animationName = "progress";
          node.style.animationDuration = `${timeUntilNext}ms`;
          node.style.transform = "scaleX(1)";
          node.style.animationFillMode = "forwards";
          node.style.animationTimingFunction = "linear";
        }, 20);
      });

      setShowAutoplayProgress(true);
    },
    [progressNode],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = emblaApi.plugins().autoplay;
    if (!autoplay) return;

    // Avvia manualmente la progress bar all'inizio
    const initialTimeout = setTimeout(() => {
      startProgress(autoplay.timeUntilNext());
    }, 0);

    emblaApi
      .on("autoplay:timerset", () => startProgress(autoplay.timeUntilNext()))
      .on("autoplay:timerstopped", () => {
        setShowAutoplayProgress(false);
        if (progressNode.current) {
          progressNode.current.style.animationName = "none";
          progressNode.current.style.transform = "scaleX(0)";
        }
      });

    return () => {
      cancelAnimationFrame(rafId.current);
      clearTimeout(timeoutId.current);
      clearTimeout(initialTimeout);
    };
  }, [emblaApi, startProgress, progressNode]);

  return {
    showAutoplayProgress,
    startProgress,
  };
};
