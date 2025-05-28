"use client";

import { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import TrashButton from "@/app/_components/ui/TrashButton";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { formatPrice } from "@/app/_lib/formatPrice";

export default function FavoriteCard({
  product,
  userId,
  cartId,
  onDelete,
  onAdd,
}) {
  const [isPending, startTransition] = useTransition();

  function handleAdd() {
    startTransition(() => onAdd(cartId, userId, product.id));
  }

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isPending ? "animate-scaleOut" : ""
      }`}
    >
      <div className="flex flex-col gap-3">
        <Link
          href={`/products/${product.id}`}
          className="pb-3 border-b border-zinc-200"
        >
          <div className="flex flex-col gap-3">
            <div className="relative h-85 aspect-2/3 group">
              <Image
                src={product.image?.at(0)}
                fill
                alt={product.name}
                className="object-cover rounded-lg"
              />
            </div>

            <div className="flex items-center">
              <h1 className="text-md text-zinc-500 font-normal">
                {product.name}
              </h1>
              <span className="font-medium ml-auto">
                {formatPrice(product.regularPrice)}
              </span>
            </div>
          </div>
        </Link>

        <div className="flex items-center justify-center gap-5 border-b border-b-zinc-200 w-full pb-3">
          <button
            className="py-2 px-2 w-max rounded-full bg-primary-950 hover:bg-primary-800 text-primary-100 font-bold cursor-pointer transition-colors duration-300 text-center"
            onClick={handleAdd}
          >
            <ShoppingBagIcon className="size-5" />
          </button>
          <TrashButton
            userId={userId}
            productId={product.id}
            onDelete={onDelete}
            startTransition={startTransition}
          />
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import TrashButton from "@/app/_components/ui/TrashButton";

// export default function FavoriteCard({ product, userId, onRemove }) {
//   const [isRemoving, setIsRemoving] = useState(false);

//   const handleDeleteStart = async () => {
//     setIsRemoving(true);
//     // Potresti aggiungere qui un breve timeout per far partire l'animazione
//     // prima di notificare la rimozione, se lo desideri.
//     setTimeout(async () => {
//       if (onRemove) {
//         onRemove(product.id);
//       }
//       // La rimozione effettiva dal database avviene nel TrashButton
//     }, 300); // Corrisponde alla durata dell'animazione
//   };

//   return (
//     <div
//       className={`transition-all duration-300 ease-in-out ${
//         isRemoving ? "animate-moveLeft" : ""
//       }`}
//       style={{
//         overflow: "hidden", // Importante per nascondere l'elemento mentre trasla
//         height: isRemoving ? "auto" : "auto",
//       }}
//     >
//       <div className="flex flex-col gap-3">
//         <Link href={`/products/${product.id}`} className="mb-1">
//           <div className="flex flex-col gap-3">
//             <div className="relative h-100 aspect-2/3 group">
//               <Image
//                 src={product.image?.at(0)}
//                 fill
//                 alt={product.name}
//                 className="object-cover rounded-lg"
//               />
//               <TrashButton
//                 userId={userId}
//                 productId={product.id}
//                 onDelete={handleDeleteStart}
//               />
//             </div>

//             <div className="flex items-center">
//               <h1 className="text-md text-zinc-500 font-normal">
//                 {product.name}
//               </h1>
//               <span className="font-medium ml-auto">
//                 {Number.isInteger(product.regularPrice)
//                   ? `${product.regularPrice},00`
//                   : product.regularPrice.toFixed(2).replace(".", ",")}{" "}
//                 &euro;
//               </span>
//             </div>
//           </div>
//         </Link>

//         <button className="py-2 uppercase bg-primary-950 hover:bg-primary-800 text-primary-100 font-bold cursor-pointer transition-colors duration-300">
//           Sposta nel carrello
//         </button>
//       </div>
//     </div>
//   );
// }
