import { getAllProducts, getProduct } from "@/app/_lib/data-service";

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

  return <div className="">{product.name}</div>;
}
