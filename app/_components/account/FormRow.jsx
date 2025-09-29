function FormRow({
  id,
  label,
  type,
  disabled = false,
  ariaLabel = "",
  ...props
}) {
  return (
    <>
      <label htmlFor={id} className={`w-fit`}>
        {label}
      </label>
      {ariaLabel && (
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {ariaLabel}
        </span>
      )}
      <input
        id={id}
        name={id}
        type={type}
        disabled={disabled}
        className="accountFormFocus w-full rounded-xl border border-gray-300 px-2 py-2 text-base transition-colors duration-200 placeholder:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-neutral-400 dark:border-zinc-700 dark:bg-zinc-600/30 dark:disabled:border-zinc-700 dark:disabled:bg-zinc-700/80 dark:disabled:text-zinc-500"
        {...props}
      />
    </>
  );
}

export default FormRow;
