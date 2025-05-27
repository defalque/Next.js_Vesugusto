"use client";

import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="bg-primary-950 hover:bg-primary-900 dark:bg-primary-800 dark:text-primary-50 dark:hover:bg-primary-600 px-8 py-2 text-primary-50 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-primary-600 self-start mt-4 cursor-pointer rounded-md"
    >
      {pending ? <SpinnerMini></SpinnerMini> : "Aggiorna il tuo profilo"}
    </button>
  );
}
