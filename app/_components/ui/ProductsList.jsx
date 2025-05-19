"use client";

import Image from "next/image";
import { HeartIcon, PlusIcon } from "@heroicons/react/24/outline";
import SpinnerMiniColored from "./SpinnerMiniColored";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function ProductsList({ products, filter, filters, page, count }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  // let displayedProducts;
  // if (filter === "all") displayedProducts = products;
  // if (filter === "food")
  //   displayedProducts = products.filter((product) => product.type === "food");
  // if (filter === "drink")
  //   displayedProducts = products.filter((product) => product.type === "drink");

  // if (filters.price === 0) displayedProducts = products;
  // if (filters.price === "10")
  //   displayedProducts = products.filter(
  //     (product) => product.regularPrice <= 10
  //   );
  // if (filters.price === "10-20")
  //   displayedProducts = products.filter(
  //     (product) => product.regularPrice > 10 && product.regularPrice <= 20
  //   );
  // if (filters.price === "20-30")
  //   displayedProducts = products.filter(
  //     (product) => product.regularPrice > 20 && product.regularPrice <= 30
  //   );
  // if (filters.price === "30-50")
  //   displayedProducts = products.filter(
  //     (product) => product.regularPrice > 30 && product.regularPrice <= 50
  //   );

  // let displayedProducts = products?.filter((product) => {
  //   const matchesType = filters.type === "all" || product.type === filters.type;

  //   let matchesPrice = true;

  //   if (filters.price === "10") {
  //     matchesPrice = product.regularPrice <= 10;
  //   } else if (filters.price === "10-20") {
  //     matchesPrice = product.regularPrice > 10 && product.regularPrice <= 20;
  //   } else if (filters.price === "20-30") {
  //     matchesPrice = product.regularPrice > 20 && product.regularPrice <= 30;
  //   } else if (filters.price === "30-50") {
  //     matchesPrice = product.regularPrice > 30 && product.regularPrice <= 50;
  //   }

  //   return matchesType && matchesPrice;
  // });

  useEffect(() => {
    if (isLoadingMore) {
      setIsLoadingMore(false);
    }
  }, [products]);

  return (
    <div>
      <div className="grid grid-cols-3 gap-y-30 gap-x-14 px-5 transition-all duration-3000 ease-in-out">
        {products?.map((product) => (
          <div key={product.id} className="flex flex-col">
            <div className="relative h-120 w-full aspect-2/3 group mb-2">
              <Image
                src={product.image?.at(0)}
                fill
                alt={product.name}
                className={`object-cover rounded-lg transition duration-300 ease-in-out  ${
                  product.image?.at(1)
                    ? "group-hover:opacity-0"
                    : "group-hover:opacity-85"
                }`}
              ></Image>
              {product.image?.at(1) ? (
                <Image
                  src={product.image?.at(1)}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg absolute top-0 left-0 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-85"
                />
              ) : null}
            </div>

            <div className="flex items-center mb-1">
              <h1 className="text-md text-zinc-500 font-normal">
                {product.name}
              </h1>
              <PlusIcon className="ml-auto mr-2 size-5.5 cursor-pointer text-zinc-500 hover:text-primary-dark-950"></PlusIcon>
              <HeartIcon className="size-5.5 cursor-pointer text-zinc-500 hover:fill-primary-dark-900 hover:text-primary-dark-900 transition-colors"></HeartIcon>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-xl">
                {product.regularPrice}&euro;
              </span>
              <span className="text-sm text-primary-950 ml-auto hover:text-primary-800">
                Vai ai dettagli &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8 text-sm">
        <span className="text-primary-700">
          Hai visualizzato {products.length} di {count} prodotti
        </span>
      </div>
      {products?.length > 0 && products.length < count && (
        <div className="text-center py-2 flex items-center w-full justify-center mt-4">
          <button
            className={`cursor-pointer px-4 py-2  ${
              isLoadingMore
                ? "bg-transparent hover:bg-transparent"
                : "bg-primary-500 text-white rounded-lg hover:bg-primary-700"
            }`}
            onClick={() => {
              setIsLoadingMore(true);
              const params = new URLSearchParams(searchParams.toString());
              const currentPage = Number(params.get("page")) || 1;
              const nextPage = currentPage + 1;

              params.set("page", nextPage.toString());

              router.replace(`${pathname}?${params.toString()}`, {
                scroll: false,
              });
            }}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <SpinnerMiniColored></SpinnerMiniColored>
            ) : (
              "Carica altri"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductsList;
