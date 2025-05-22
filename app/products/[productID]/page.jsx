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

// <div className="flex flex-col justify-center gap-10 -mt-10">
//   <h1 className="text-5xl font-medium">Ops! Prodotto esaurito</h1>
//   <p className="text-xl">
//     Ci dispiace, questo prodotto è momentaneamente esaurito. Stiamo
//     lavorando per renderlo nuovamente disponibile al più presto. Nel
//     frattempo, dai un’occhiata ai nostri{" "}
//     <Link href="/products" className="text-primary-950 font-semibold">
//       prodotti
//     </Link>
//     {", "}
//     potresti trovare qualcosa di ancora più interessante!
//   </p>
// </div>
