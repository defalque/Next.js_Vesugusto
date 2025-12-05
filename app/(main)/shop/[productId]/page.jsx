import ProductDetails from "@/app/_components/shop/ProductDetails";
// import dynamic from "next/dynamic";
// const ProductDetails = dynamic(
//   () => import("../../_components/shop/ProductDetails"),
// );

import { getAllProducts, getProduct } from "@/app/_lib/data-service";
import ProductImages from "@/app/_components/shop/ProductImages";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/_components/ui/Breadcrumbs";
import { Share2, Star } from "lucide-react";
import { notoSerif } from "@/app/_lib/font";

// export async function generateMetadata({ params }) {
//   const { productId } = await params;
//   const product = await getProduct(productId);
//   return { title: `${product.name}`, description: `${product.description}` };
// }

export async function generateStaticParams() {
  const products = await getAllProducts();

  const IDs = products.map((product) => ({
    productId: String(product.id),
  }));

  return IDs;
}

export default async function Page({ params }) {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Shop", href: "/shop" },
    { label: product.name, href: `/shop/${product.id}`, active: true },
  ];

  return (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-4 py-5 sm:px-6 lg:px-10 xl:px-20 xl:py-12">
      <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-[25rem_1fr] md:grid-rows-[auto_1fr] md:gap-y-0">
        <div className="md:row-span-full">
          <ProductImages product={product}></ProductImages>
        </div>

        <div className="col-start-1 mb-1 flex flex-col gap-2 md:col-start-2 md:mb-5">
          <div className="flex items-center justify-between">
            <h1
              className={`text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 ${notoSerif.className}`}
            >
              {product.name}
            </h1>
            <button className="cursor-pointer text-gray-400 transition-colors duration-200 hover:text-black dark:text-zinc-400 dark:hover:text-white">
              <Share2 className="size-5" />
            </button>
          </div>
          <div className="col-start-1 flex items-center gap-4 md:col-start-2">
            <div className="flex gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className={`text-primary-dark-200 size-4 ${i <= 3 && "fill-primary-dark-200"}`}
                />
              ))}
            </div>
            <span className="text-sm text-black/80 dark:text-white/80">
              78 recensioni
            </span>
          </div>
        </div>

        <div className="md:col-start-2">
          <ProductDetails product={product}></ProductDetails>
        </div>
      </div>
    </div>
  );
}
