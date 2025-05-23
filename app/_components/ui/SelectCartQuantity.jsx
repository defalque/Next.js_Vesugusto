"use client";

import { updateCartItem } from "@/app/_lib/actions";

function SelectCartQuantity({ cartId, cartQuantity, product, setIsLoading }) {
  const handleQuantity = async (e) => {
    setIsLoading(true);
    await updateCartItem(cartId, product.id, Number(e.target.value));
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-2 mx-8">
      <label htmlFor="quantity" className="">
        Quantità
      </label>
      <select
        name="quantity"
        id="quantity"
        value={cartQuantity}
        onChange={handleQuantity}
        className="px-2 py-2 w-20 shadow-sm rounded-md border border-zinc-300 transition duration-150 focus:outline-none focus:ring-1 focus:ring-primary-950"
        required
      >
        {Array.from(
          { length: Math.min(product.productQuantity + cartQuantity, 10) },
          (_, i) => i + 1
        ).map((x) => (
          <option value={x} key={x}>
            {x}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectCartQuantity;
