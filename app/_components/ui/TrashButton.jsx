"use client";

import { deleteFavorite } from "@/app/_lib/actions";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useTransition } from "react";

function TrashButton({ userId, productId, onDelete, startTransition }) {
  function handleDelete(e) {
    e.preventDefault();
    e.stopPropagation();
    startTransition(() => onDelete(userId, productId));
  }

  return (
    <button
      className="absolute top-1.5 right-1.5 px-2 py-2 rounded-full bg-primary-50 hover:bg-gray-100 transition-colors duration-200 w-max cursor-pointer opacity-80 outline-primary-950"
      onClick={handleDelete}
    >
      <TrashIcon className="size-6"></TrashIcon>
    </button>
  );
}

export default TrashButton;

// "use client";

// import { deleteFavorite } from "@/app/_lib/actions";
// import { TrashIcon } from "@heroicons/react/24/outline";

// function TrashButton({ userId, productId, onDelete }) {
//   const handleDelete = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (onDelete) onDelete(); // Avvia l'animazione e notifica il genitore

//     // La rimozione dal database avviene qui
//     await deleteFavorite(userId, productId);
//   };

//   return (
//     <button
//       className="absolute top-1.5 right-1.5 px-2 py-2 rounded-full bg-primary-50 hover:bg-gray-100 transition-colors duration-200 w-max cursor-pointer opacity-80 outline-primary-950"
//       onClick={handleDelete}
//     >
//       <TrashIcon className="size-6"></TrashIcon>
//     </button>
//   );
// }

// export default TrashButton;
