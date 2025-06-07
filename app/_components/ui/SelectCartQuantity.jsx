"use client";

import { updateCartItem } from "@/app/_lib/actions";
import { toast, ToastContainer } from "react-toastify";
import { useDarkMode } from "../contexts/DarkModeContext";

function SelectCartQuantity({ cartId, cartQuantity, product, setIsLoading }) {
  const { isDarkMode } = useDarkMode();

  const handleQuantity = async (e) => {
    try {
      setIsLoading(true);
      await updateCartItem(cartId, product.id, Number(e.target.value));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error(<span>{err.message}</span>);
    }
  };

  return (
    <div className="flex flex-col gap-2 mx-1 xl:mx-8 text-xs xs:text-sm xl:text-base">
      <label htmlFor={`quantity-${product.id}`}>Quantità</label>
      <select
        name="quantity"
        id={`quantity-${product.id}`}
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        theme={isDarkMode ? "light" : "dark"}
      />
    </div>
  );
}

export default SelectCartQuantity;
