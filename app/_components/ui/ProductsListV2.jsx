// "use client";

// import Image from "next/image";
// import { HeartIcon, PlusIcon } from "@heroicons/react/24/outline";
// import { useEffect, useRef, useState } from "react";
// import { getAllProducts } from "@/app/_lib/data-service";

// function ProductsList({ filter }) {
//   const LIMIT = 6;
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const observerRef = useRef(null);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const data = await getAllProducts(page, LIMIT);
//         setProducts((prev) => {
//           const newProducts = data.filter(
//             (newProduct) =>
//               !prev.some(
//                 (existingProduct) => existingProduct.id === newProduct.id
//               )
//           );
//           return [...prev, ...newProducts];
//         });
//         if (data.length < LIMIT) setHasMore(false);
//       } catch (err) {
//         console.error("Errore nel fetch:", err.message);
//       }
//     };

//     load();
//   }, [page]);

//   useEffect(() => {
//     if (!hasMore) return;

//     const observer = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting) {
//         setPage((prev) => prev + 1);
//       }
//     });

//     const ref = observerRef.current;
//     if (ref) observer.observe(ref);

//     return () => {
//       if (ref) observer.unobserve(ref);
//     };
//   }, [hasMore]);

//   let displayedProducts;
//   if (filter === "all") displayedProducts = products;
//   if (filter === "food")
//     displayedProducts = products.filter((product) => product.type === "food");
//   if (filter === "drink")
//     displayedProducts = products.filter((product) => product.type === "drink");

//   console.log(products, displayedProducts);

//   return (
//     <div className="grid grid-cols-3 gap-y-30 gap-x-14 px-5 transition-all duration-3000 ease-in-out">
//       {displayedProducts.map((product) => (
//         <div key={product.id} className="flex flex-col">
//           <div className="relative h-120 w-full aspect-2/3 group mb-2">
//             <Image
//               src={product.image?.at(0)}
//               fill
//               alt={product.name}
//               className={`object-cover rounded-lg transition duration-300 ease-in-out  ${
//                 product.image?.at(1)
//                   ? "group-hover:opacity-0"
//                   : "group-hover:opacity-85"
//               }`}
//             ></Image>
//             {product.image?.at(1) && (
//               <Image
//                 src={product.image?.at(1)}
//                 alt={product.name}
//                 fill
//                 className="object-cover rounded-lg absolute top-0 left-0 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-85"
//               />
//             )}
//           </div>

//           <div className="flex items-center mb-1">
//             <h1 className="text-md text-zinc-500 font-normal">
//               {product.name}
//             </h1>
//             <PlusIcon className="ml-auto mr-2 size-5.5 cursor-pointer text-zinc-500 hover:text-primary-dark-950"></PlusIcon>
//             <HeartIcon className="size-5.5 cursor-pointer text-zinc-500 hover:fill-primary-dark-900 hover:text-primary-dark-900 transition-colors"></HeartIcon>
//           </div>
//           <div className="flex items-center">
//             <span className="font-medium text-xl">20$</span>
//             <span className="text-sm text-primary-950 ml-auto hover:text-primary-800">
//               Vai ai dettagli &rarr;
//             </span>
//           </div>
//         </div>
//       ))}

//       {hasMore && (
//         <div ref={observerRef} className="text-center py-6 text-gray-500">
//           Caricamento...
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductsList;

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { HeartIcon, PlusIcon } from "@heroicons/react/24/outline";
import { getAllProducts } from "@/app/_lib/data-service";
import SpinnerMini from "./SpinnerMini";

function ProductsList({ filter }) {
  const LIMIT = 9;
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  // const [isFirstLoadDone, setIsFirstLoadDone] = useState(false);

  // 🔄 Reset dati quando cambia filtro
  useEffect(() => {
    setProducts([]);
    setPage(0);
    setHasMore(true);
  }, [filter]);

  // 📦 Fetch prodotti quando cambia page o filtro
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const newProducts = await getAllProducts(page, LIMIT, filter);
        // niente più filtro manuale lato client
        setProducts((prev) =>
          page === 0 ? newProducts : [...prev, ...newProducts]
        );
        if (newProducts.length < LIMIT) setHasMore(false);
        // if (page === 0) setIsFirstLoadDone(true);
      } catch (err) {
        console.error("Errore nel fetch:", err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page, filter]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-y-30 gap-x-14 px-5 transition-all duration-3000 ease-in-out">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col">
            <div className="relative h-120 w-full aspect-2/3 group mb-2">
              <Image
                src={product.image?.[0]}
                fill
                alt={product.name}
                className={`object-cover rounded-lg transition duration-300 ease-in-out ${
                  product.image?.[1]
                    ? "group-hover:opacity-0"
                    : "group-hover:opacity-85"
                }`}
              />
              {product.image?.[1] && (
                <Image
                  src={product.image?.[1]}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg absolute top-0 left-0 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-85"
                />
              )}
            </div>

            <div className="flex items-center mb-1">
              <h1 className="text-md text-zinc-500 font-normal">
                {product.name}
              </h1>
              <PlusIcon className="ml-auto mr-2 size-5.5 cursor-pointer text-zinc-500 hover:text-primary-dark-950" />
              <HeartIcon className="size-5.5 cursor-pointer text-zinc-500 hover:fill-primary-dark-900 hover:text-primary-dark-900 transition-colors" />
            </div>

            <div className="flex items-center">
              <span className="font-medium text-xl">
                {product.regularPrice}$
              </span>
              <span className="text-sm text-primary-950 ml-auto hover:text-primary-800">
                Vai ai dettagli →
              </span>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center py-6">
          <button
            onClick={loadMore}
            disabled={loading}
            className="cursor-pointer px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-700"
          >
            {loading ? <SpinnerMini /> : "Carica altri"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductsList;
