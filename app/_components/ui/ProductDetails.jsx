import ProductDetailsAccordion from "./ProductDetailsAccordion";
import ProductQuantity from "./ProductQuantity";
import HeartBurstButton from "./HeartBurstButton";
import { auth } from "@/auth";

async function ProductDetails({ product }) {
  const session = await auth();

  return (
    <div className="flex flex-col gap-3 ml-3">
      <h1 className="text-5xl font-medium mb-1">{product.name}</h1>

      <span className="font-medium text-xl mb-3">
        {Number.isInteger(product.regularPrice)
          ? `${product.regularPrice},00`
          : product.regularPrice.toFixed(2).replace(".", ",")}{" "}
        &euro;
      </span>

      <p className="text-lg text-zinc-500 mb-4">{product.description}</p>

      <ProductQuantity productQuantity={product.quantity}></ProductQuantity>

      <div className="flex items-center gap-4 mb-8">
        <button className="bg-primary-950 hover:bg-primary-800 text-primary-100 px-4 py-3 uppercase font-bold cursor-pointer rounded-sm transition-colors duration-300">
          Aggiungi al carrello
        </button>
        <HeartBurstButton
          userId={session?.user?.userId}
          productId={product.id}
        ></HeartBurstButton>
      </div>

      <div className="flex flex-col gap-0">
        <ProductDetailsAccordion
          productAttribute={product.details}
          label="Dettagli"
        />
        <ProductDetailsAccordion
          productAttribute={product.ingredients}
          label="Ingredienti"
        />
        <ProductDetailsAccordion
          productAttribute={product.info}
          label="Informazioni nutrizionali"
          isLast={true}
        />
      </div>
    </div>
  );
}

export default ProductDetails;
