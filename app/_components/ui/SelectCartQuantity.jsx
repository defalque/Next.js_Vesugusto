"use client";

import { updateCartItem } from "@/app/_lib/actions";
import toast, { Toaster } from "react-hot-toast";

function SelectCartQuantity({ cartId, cartQuantity, product, setIsLoading }) {
  const handleQuantity = async (e) => {
    try {
      setIsLoading(true);
      await updateCartItem(cartId, product.id, Number(e.target.value));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-2 mx-1 xl:mx-8 text-xs xs:text-sm xl:text-base">
      <label htmlFor="quantity" className="">
        Quantità
      </label>
      <select
        name="quantity"
        id="quantity"
        value={cartQuantity}
        onChange={handleQuantity}
        className="px-1 py-1 lg:px-2 lg:py-2 w-10 xs:w-15 lg:w-20 shadow-sm rounded-md border border-zinc-300 dark:border-dark-200 dark:bg-dark-300 transition duration-150 focus:outline-none focus:ring-1 focus:ring-primary-950"
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
      <Toaster></Toaster>
    </div>
  );
}

export default SelectCartQuantity;
