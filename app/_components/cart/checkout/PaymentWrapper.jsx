"use client";

import { useEffect } from "react";
import { showCustomErrorToast } from "../../ui/CustomToast";
import toast from "react-hot-toast";
import { CircleAlert } from "lucide-react";
import CheckoutInstructions from "./CheckoutInstructions";

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

      <CheckoutInstructions />

      <form action="/api/checkout_sessions" method="POST">
        <button
          className="bg-primary-dark-200/90 dark:hover:bg-primary-950/65 dark:bg-primary-950/80 hover:bg-primary-dark-200/75 disabled:hover:bg-primary-dark-200/90 dark:disabled:hover:bg-primary-950/80 focus-style-button w-full cursor-pointer gap-2 self-baseline rounded-full py-2 text-center text-lg font-semibold text-white shadow-sm transition-colors duration-200 disabled:cursor-not-allowed sm:self-auto"
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
