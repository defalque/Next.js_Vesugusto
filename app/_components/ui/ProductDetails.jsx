import ProductDetailsAccordion from "./ProductDetailsAccordion";
import { auth } from "@/auth";
import ProductButtons from "./ProductButtons";

async function ProductDetails({ product }) {
  const session = await auth();

  return (
    <div className="flex flex-col gap-3 ml-3">
      <h1 className="text-5xl font-medium pb-5 border-b border-b-zinc-200">
        {product.name}
      </h1>

      <span className="font-medium text-xl my-4">
        {Number.isInteger(product.regularPrice)
          ? `${product.regularPrice},00`
          : product.regularPrice.toFixed(2).replace(".", ",")}{" "}
        &euro;
      </span>

      <p className="text-lg text-zinc-500 mb-4">{product.description}</p>

      <ProductButtons
        cartId={session?.user?.cartId}
        userId={session?.user?.userId}
        product={product}
      ></ProductButtons>

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
