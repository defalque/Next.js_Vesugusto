import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

function CartProducts({ products }) {
  return (
    <div className="flex flex-col">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-start gap-5 py-6 border-t border-t-zinc-200 last:border-b last:border-b-zinc-200"
        >
          <div className="h-50 relative aspect-2/3">
            <Image
              src={product.image?.at(0)}
              fill
              alt={product.name}
              className="object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-xl text-zinc-500">{product.name}</h1>
            <span className="text-lg font-semibold">
              {Number.isInteger(product.regularPrice)
                ? `${product.regularPrice},00`
                : product.regularPrice.toFixed(2).replace(".", ",")}{" "}
              &euro;
            </span>
          </div>

          <div className="flex flex-col gap-2 ml-auto">
            <label htmlFor="quantity" className="pt-1">
              Quantità
            </label>
            <select
              name="quantity"
              id="quantity"
              defaultValue={product.cartQuantity}
              className="px-2 py-2 shadow-sm rounded-md border border-zinc-300 outline-primary-950 transition duration-150 focus:outline-none focus:ring-1 focus:ring-primary-950"
              required
            >
              {Array.from(
                { length: product.productQuantity },
                (_, i) => i + 1
              ).map((x) => (
                <option value={x} key={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>

          <button className=" outline-primary-950 ml-auto cursor-pointer">
            <XMarkIcon className="size-8"></XMarkIcon>
          </button>
        </div>
      ))}
    </div>
  );
}

export default CartProducts;
