function FormRow({ id, label, type, disabled = false, ...props }) {
  return (
    <>
      <label htmlFor={id} className={`w-fit`}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        disabled={disabled}
        // className="bg-primary-50 focus w-full rounded-xl border border-gray-300 px-2 py-2 transition-colors duration-200 hover:border-gray-400 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-neutral-400 dark:border-zinc-700 dark:bg-zinc-900 dark:disabled:bg-zinc-700/80"
        className="_focus:border-primary-950 _focus:ring-primary-950/20 _focus:ring-2 _focus:outline-none accountLinksFocus w-full rounded-xl border border-gray-300 px-2 py-2 text-base transition-colors duration-200 placeholder:text-gray-500 hover:border-gray-400 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-neutral-400 dark:border-zinc-700 dark:bg-zinc-600/30 dark:disabled:border-zinc-700 dark:disabled:bg-zinc-700/80 dark:disabled:text-zinc-500"
        {...props}
      />
    </>
  );
}

export default FormRow;
