import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

function ProductAvailability({ quantity }) {
  const formattedQuantity = ` Disponibilità limitata - Solo ${quantity}`;

  return (
    <span className="xs:row-start-4 col-start-2 row-start-5 mt-auto mb-0.5 flex items-center gap-1 text-xs font-light lg:text-sm">
      {quantity !== 0 && (
        <CheckIcon
          aria-hidden
          className={`size-5 ${
            quantity > 10
              ? "font-bold text-lime-500"
              : "font-medium text-yellow-500"
          }`}
        />
      )}
      {quantity === 0 && (
        <span className="mt-auto mb-0.5 flex items-center gap-1 text-sm font-light">
          <XMarkIcon aria-hidden className="size-5 text-red-600" />
          Esaurito
        </span>
      )}

      {quantity <= 10 && quantity > 0 && (
        <>
          <span className="hidden md:inline">{formattedQuantity}</span>
          <span className="inline md:hidden">Solo {quantity}</span>
        </>
      )}

      {quantity > 10 && "Disponibile"}
    </span>
  );
}

export default ProductAvailability;
