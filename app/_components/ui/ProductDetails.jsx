import { HeartIcon } from "@heroicons/react/24/outline";
import ProductDetailsAccordion from "./ProductDetailsAccordion";
import ProductQuantity from "./ProductQuantity";
import HeartBurstButton from "./HeartBurstButton";

function ProductDetails({ product }) {
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
        {/* <div className="px-3 py-3 bg-primary-100 rounded-full">
          <HeartIcon className="size-6 cursor-pointer text-primary-dark-900 hover:fill-primary-950 hover:text-primary-950"></HeartIcon>
        </div> */}
        <HeartBurstButton></HeartBurstButton>
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
