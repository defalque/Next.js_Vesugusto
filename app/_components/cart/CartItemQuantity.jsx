function CartItemQuantity({
  productId,
  cartItemQuantity,
  productQuantity,
  handleUpdateCartItemQuantity,
  disabled,
}) {
  return (
    <>
      <label
        htmlFor={`product${productId}`}
        className="xs:row-start-1 xs:col-start-3 xs:mt-0 col-start-2 row-start-3 mt-3 self-baseline"
      >
        Quantità
      </label>
      <select
        name="quantity"
        id={`product${productId}`}
        value={cartItemQuantity}
        onChange={(e) => handleUpdateCartItemQuantity(e.target.value)}
        className="focus xs:row-start-2 xs:col-start-3 xs:mb-0 col-start-2 row-start-4 mb-3 w-20 cursor-pointer rounded-md border border-gray-300 px-1 py-1 transition-shadow duration-200 hover:shadow-sm active:shadow-sm disabled:animate-pulse disabled:cursor-not-allowed lg:px-2 lg:py-2 dark:border-zinc-800 dark:bg-zinc-900"
        disabled={disabled}
        required
      >
        {Array.from(
          { length: Math.min(productQuantity + cartItemQuantity, 10) },
          (_, i) => i + 1,
        ).map((x) => (
          <option value={x} key={x}>
            {x}
          </option>
        ))}
      </select>
    </>
  );
}

export default CartItemQuantity;
