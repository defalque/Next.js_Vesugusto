"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { HeartIcon, PlusIcon } from "@heroicons/react/24/outline";
import SpinnerMiniColored from "./SpinnerMiniColored";

function ProductsList({ productsCount, filter }) {
  const LIMIT = 9;
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // 🔄 Reset quando cambia filtro
  useEffect(() => {
    setProducts([]);
    setPage(0); // Questo triggera l’useEffect sotto (incluso page === 0)
    setHasMore(true);
  }, [filter]);

  // 📦 Fetch ogni volta che cambia `page`
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/products?page=${page}&limit=${LIMIT}&filter=${filter}`
        );
        const data = await res.json();
        setProducts((prev) => (page === 0 ? data : [...prev, ...data]));
        if (data.length < LIMIT) setHasMore(false);
      } catch (err) {
        console.error("Errore fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

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

      {products.length > 0 && (
        <div className="text-center mt-8 text-sm">
          <span className="text-primary-700">
            Hai visualizzato {products.length} di {productsCount} prodotti
          </span>
        </div>
      )}
      {hasMore && products.length > 0 && (
        <div className="text-center py-2">
          <button
            onClick={loadMore}
            disabled={loading}
            className={`cursor-pointer px-4 py-2  ${
              loading
                ? "bg-transparent hover:bg-transparent"
                : "bg-primary-500 text-white rounded-lg hover:bg-primary-700"
            }`}
          >
            {loading ? <SpinnerMiniColored /> : "Carica altri"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductsList;
