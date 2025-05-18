import Image from "next/image";
import { HeartIcon, PlusIcon } from "@heroicons/react/24/outline";

function ProductsList({ products, filter }) {
  let displayedProducts;
  if (filter === "all") displayedProducts = products;
  if (filter === "food")
    displayedProducts = products.filter((product) => product.type === "food");
  if (filter === "drink")
    displayedProducts = products.filter((product) => product.type === "drink");
  console.log(products, displayedProducts);

  return (
    <div className="grid grid-cols-3 gap-y-30 gap-x-14 px-5 transition-all duration-3000 ease-in-out">
      {displayedProducts.map((product) => (
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
            <span className="font-medium text-xl">20$</span>
            <span className="text-sm text-primary-950 ml-auto hover:text-primary-800">
              Vai ai dettagli &rarr;
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductsList;
