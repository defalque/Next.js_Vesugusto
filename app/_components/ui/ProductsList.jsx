"use client";

import Image from "next/image";
import {
  HeartIcon,
  PlusIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useHideFilters } from "../contexts/HideFiltersProvider";

function ProductsList({ products }) {
  const { isHidden, setIsHidden } = useHideFilters();

  return (
    <>
      <div className="">
        {isHidden ? (
          <div
            className="flex items-center justify-end mb-2 cursor-pointer py-4 px-5 sticky top-0 z-100 bg-primary-50"
            onClick={() => setIsHidden(!isHidden)}
          >
            <span className="mr-2">Mostra filtri</span>
            <EyeIcon className="size-5"></EyeIcon>
          </div>
        ) : (
          <div
            className="flex items-center justify-end mb-2 cursor-pointer py-4 px-5 sticky top-0 z-100 bg-primary-50"
            onClick={() => setIsHidden(!isHidden)}
          >
            <span className="mr-2">Nascondi filtri</span>
            <EyeSlashIcon className="size-5"></EyeSlashIcon>
          </div>
        )}

        <div className="grid grid-cols-3 gap-y-30 gap-x-14 px-5 transition-all duration-3000 ease-in-out">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col">
              <div className="relative w-full aspect-2/3 group mb-2">
                <Image
                  src={product.image}
                  fill
                  alt={product.name}
                  className="object-cover rounded-lg transition duration-300 ease-in-out group-hover:opacity-85"
                ></Image>
              </div>
              <div className="flex items-center mb-1">
                <h1 className="text-md text-zinc-500 font-normal">
                  {product.name}
                </h1>
                <PlusIcon className="ml-auto mr-2 size-5.5 cursor-pointer text-zinc-500 hover:text-primary-dark-950"></PlusIcon>
                <HeartIcon className="size-5.5 cursor-pointer text-zinc-500 hover:fill-primary-dark-900 hover:text-primary-dark-900 transition-colors"></HeartIcon>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-xl">20$</span>
                <span className="text-sm text-primary-950 ml-auto hover:text-primary-800">
                  Vai ai dettagli &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductsList;
