import { getFavorites } from "@/app/_lib/data-service";
import { TrashIcon } from "@heroicons/react/24/outline";
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "I tuoi preferiti",
};

export default async function Page() {
  const session = await auth();

  const products = await getFavorites(session.user.userId);

  if (products.length === 0)
    return (
      <div>
        <p>Non hai nessun prodotto tra i preferiti.</p>
      </div>
    );

  return (
    <div className="grid grid-cols-4 gap-10">
      {products.map((product) => (
        <div key={product.id}>
          <div className="flex flex-col gap-3">
            <Link href={`/products/${product.id}`} className="mb-1">
              <div className="flex flex-col gap-3">
                <div className="relative h-100 aspect-2/3 group">
                  <Image
                    src={product.image?.at(0)}
                    fill
                    alt={product.name}
                    className="object-cover rounded-lg"
                  ></Image>
                  <div className="absolute top-1.5 right-1.5 px-2 py-2 rounded-full bg-primary-50 w-max cursor-pointer opacity-80">
                    <TrashIcon className="size-6"></TrashIcon>
                  </div>
                </div>

                <div className="flex items-center">
                  <h1 className="text-md text-zinc-500 font-normal">
                    {product.name}
                  </h1>
                  <span className="font-medium ml-auto">
                    {Number.isInteger(product.regularPrice)
                      ? `${product.regularPrice},00`
                      : product.regularPrice.toFixed(2).replace(".", ",")}{" "}
                    &euro;
                  </span>
                </div>
              </div>
            </Link>

            <button className="py-2 uppercase bg-primary-950 hover:bg-primary-800 text-primary-100 font-bold cursor-pointer transition-colors duration-300">
              Sposta nel carrello
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
