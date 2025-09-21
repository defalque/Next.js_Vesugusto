import ProductDetails from "@/app/_components/shop/ProductDetails";
// import dynamic from "next/dynamic";
// const ProductDetails = dynamic(
//   () => import("../../_components/shop/ProductDetails"),
// );

import {
  getAllProducts,
  getProduct,
  getProductNameAndDescription,
} from "@/app/_lib/data-service";
import ProductImages from "@/app/_components/shop/ProductImages";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/_components/ui/Breadcrumbs";

export async function generateMetadata({ params }) {
  const { productId } = await params;
  const product = await getProduct(productId);
  return { title: `${product.name}`, description: `${product.description}` };
}

export async function generateStaticParams({ params }) {
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
    <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-5 py-5 xl:px-38 xl:py-12">
      <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2 md:grid-rows-[auto_1fr] md:gap-y-0">
        <div className="col-start-1 mb-0 md:col-start-2 md:mb-8">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>

        <div className="md:row-span-full">
          <ProductImages product={product}></ProductImages>
        </div>

        <div className="md:col-start-2">
          <ProductDetails product={product}></ProductDetails>
        </div>
      </div>
    </div>
  );
}
