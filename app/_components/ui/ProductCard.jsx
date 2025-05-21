import { HeartIcon, PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

function ProductCard({ product }) {
  return (
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
        <h1 className="text-md text-zinc-500 font-normal">{product.name}</h1>
        <PlusIcon className="ml-auto mr-2 size-5.5 cursor-pointer text-zinc-500 hover:text-primary-dark-950"></PlusIcon>
        <HeartIcon className="size-5.5 cursor-pointer text-zinc-500 hover:fill-primary-dark-900 hover:text-primary-dark-900 transition-colors"></HeartIcon>
      </div>
      <div className="flex items-center">
        <span className="font-medium text-xl">
          {Number.isInteger(product.regularPrice)
            ? `${product.regularPrice},00`
            : product.regularPrice.toFixed(2).replace(".", ",")}{" "}
          &euro;
        </span>
        <Link
          href={`/products/${product.id}`}
          className="text-sm text-primary-950 ml-auto hover:text-primary-800"
        >
          Vai ai dettagli &rarr;
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
