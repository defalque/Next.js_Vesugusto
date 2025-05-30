import ProductDetails from "@/app/_components/ui/ProductDetails";
import ProductImage from "@/app/_components/ui/ProductImage";
import { getAllProducts, getProduct } from "@/app/_lib/data-service";
import { Toaster } from "react-hot-toast";

export async function generateMetadata({ params }) {
  const { productID } = await params;
  const { name } = await getProduct(productID);
  return { title: `${name}` };
}

export async function generateStaticParams({ params }) {
  const products = await getAllProducts();

  const IDs = products.map((product) => ({
    productID: String(product.id),
  }));

  return IDs;
}

export default async function Page({ params }) {
  const { productID } = await params;
  const product = await getProduct(productID);

  return (
    <div className="flex items-center justify-center w-full px-40 py-10">
      <div className="grid gap-x-5 grid-cols-2">
        <ProductImage product={product}></ProductImage>
        <ProductDetails product={product}></ProductDetails>
        <Toaster toastOptions={{}}></Toaster>
      </div>
    </div>
  );
}
