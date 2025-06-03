// "use client";

// export default function Error({ error, reset }) {
//   return (
//     <main className="flex justify-center items-center flex-col gap-6">
//       <h1 className="text-3xl font-semibold">Qualcosa è andato storto!</h1>
//       <p className="text-lg">{error.message}</p>

//       <button
//         className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
//         onClick={reset}
//       >
//         Riprova
//       </button>
//     </main>
//   );
// }

"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center items-center flex-col gap-6">
      <h2 className="text-3xl font-semibold">Something went wrong!</h2>
      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg cursor-pointer"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
