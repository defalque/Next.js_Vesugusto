"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";

function TrashButton({ userId, productId, onDelete, startTransition }) {
  function handleDelete(e) {
    e.preventDefault();
    e.stopPropagation();
    startTransition(() => onDelete(userId, productId));
  }

  return (
    <button
      className="absolute top-1 right-1 px-1 py-1 rounded-full bg-primary-50 hover:bg-gray-50 transition-colors duration-200 w-max cursor-pointer opacity-95 outline-primary-950 font-bold"
      onClick={handleDelete}
    >
      <XMarkIcon className="size-4"></XMarkIcon>
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
