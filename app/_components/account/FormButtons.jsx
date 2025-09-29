import Button from "../ui/Button";

function FormButtons({
  isSubmitting,
  defaultText,
  pendingText,
  isDirty,
  onClick,
}) {
  const isFormChanged = isDirty ?? true;

  return (
    <div className="mt-5 flex flex-col gap-4 text-base sm:flex-row sm:justify-end sm:gap-2">
      <Button
        type="submit"
        className="self-baseline rounded px-4 py-2 text-center font-medium"
        disabled={isSubmitting || !isFormChanged}
      >
        {isSubmitting ? pendingText : defaultText}
      </Button>

      <button
        type="button"
        className="inline-flex cursor-pointer items-center justify-center self-baseline rounded-md bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-50 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700 dark:active:bg-zinc-700 dark:disabled:bg-zinc-900"
        disabled={isSubmitting || !isFormChanged}
        onClick={onClick}
        aria-label="Cancella modifiche e ripristina il form"
      >
        Cancella modifiche
      </button>
    </div>
  );
}

export default FormButtons;
