"use client";

import { useEffect } from "react";
import { showCustomErrorToast } from "../../ui/CustomToast";
import toast from "react-hot-toast";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { CircleAlert } from "lucide-react";

function PaymentWrapper({ amount, canceled, disabled }) {
  useEffect(() => {
    if (canceled) {
      showCustomErrorToast(toast, "Hai annullato il pagamento con Stripe.");
    }
  }, [canceled]);

  return (
    <>
      {disabled && (
        <div
          role="alert"
          aria-live="polite"
          className="bg-primary-950/10 text-primary-dark-200 flex max-w-full items-center gap-2 rounded-lg p-2 text-sm sm:text-base"
        >
          <CircleAlert aria-hidden="true" className="size-5 shrink-0" />
          <p className="font-medium hyphens-auto">
            Inserisci le informazioni sulla spedizione per poter continuare.
          </p>
        </div>
      )}

      <form action="/api/checkout_sessions" method="POST">
        <button
          className="focus-visible:dark:ring-primary-950 focus-visible:ring-primary-dark-500/95 dark:border-primary-dark-300 inset-shadow-primary-50/60 active:bg-primary-800 dark:active:border-primary-dark-100 dark:active:bg-primary-950/40 dark:hover:border-primary-dark-100 bg-primary-dark-200 hover:bg-primary-dark-100 dark:hover:bg-primary-950/40 dark:bg-primary-950/25 disabled:dark:text-primary-50 outline-primary-dark-300 disabled:bg-primary-dark-200/75 dark:disabled:bg-primary-950/20 dark:disabled:border-primary-dark-600 focus w-full cursor-pointer justify-center rounded py-3 text-sm font-bold text-white uppercase inset-shadow-sm ring-offset-transparent outline-offset-2 transition-colors duration-300 hover:shadow focus:ring-offset-2 focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:outline-none active:shadow disabled:cursor-not-allowed disabled:shadow-none disabled:inset-shadow-none disabled:text-shadow-none sm:text-base dark:border dark:inset-shadow-none dark:text-shadow-md/10"
          type="submit"
          role="link"
          aria-label="Paga su Stripe"
          disabled={disabled}
        >
          Paga {amount} con Stripe
        </button>
      </form>
    </>
  );
}

export default PaymentWrapper;
