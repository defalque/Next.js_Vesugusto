"use client";

import { useForm } from "react-hook-form";
import FormRow from "../../account/FormRow";
import FormError from "../../account/FormError";
import FormButtons from "../../account/FormButtons";
import { updateAddressInfo } from "@/app/_lib/actions";

function CheckoutForm({ via, numeroCivico, cap, comune }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      via: via || "",
      numeroCivico: numeroCivico || "",
      cap: cap || "",
      comune: comune || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const toast = (await import("react-hot-toast")).default;
      await toast.promise(updateAddressInfo(data), {
        loading: "Aggiornamento in corso...",
        success: "Informazioni aggiornate con successo!",
        error: (err) => `Errore: ${err.message}`,
      });
      reset(data);
    } catch (err) {
      console.error("Operation failed:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="xs:grid-cols-4 xs:gap-y-6 grid grid-cols-1 gap-x-5 gap-y-4 text-sm font-normal md:text-base"
    >
      <div className="col-span-3 space-y-1">
        <FormRow
          id="via"
          label="Indirizzo"
          type="text"
          {...register("via", {
            required: "Obbligatorio!",
            minLength: {
              value: 5,
              message: "La via deve contenere almeno 5 caratteri!",
            },
            pattern: {
              value: /^[a-zA-Z0-9\s.'àèéìòù,-]{5,}$/i,
              message: "La via contiene caratteri non validi!",
            },
          })}
          aria-required={true}
          aria-invalid={errors.via ? "true" : "false"}
          aria-describedby="error-via"
        />
        <FormError message={errors.via?.message} id="error-via" />
      </div>

      <div className="xs:col-span-1 col-span-3 space-y-1">
        <FormRow
          id="numeroCivico"
          label="Civico"
          type="text"
          {...register("numeroCivico", {
            required: "Obbligatorio!",
            maxLength: {
              value: 10,
              message: "Numero civico troppo lungo!",
            },
            pattern: {
              value: /^[a-zA-Z0-9/-]+$/,
              message: "Numero civico non valido!",
            },
          })}
          aria-required={true}
          aria-invalid={errors.numeroCivico ? "true" : "false"}
          aria-describedby="error-numeroCivico"
        />
        <FormError
          message={errors.numeroCivico?.message}
          id="error-numeroCivico"
        />
      </div>

      <div className="col-span-3 space-y-1">
        <FormRow
          id="comune"
          label="Comune"
          type="text"
          {...register("comune", {
            required: "Obbligatorio!",
            maxLength: {
              value: 100,
              message: "Comune troppo lungo!",
            },
            pattern: {
              value: /^[a-zàèéìòù\s'-]{2,}$/i,
              message: "Comune non valido!",
            },
          })}
          aria-required={true}
          aria-invalid={errors.comune ? "true" : "false"}
          aria-describedby="error-comune"
        />
        <FormError message={errors.comune?.message} id="error-comune" />
      </div>

      <div className="xs:col-span-1 col-span-3 space-y-1">
        <FormRow
          id="cap"
          label="CAP"
          type="text"
          {...register("cap", {
            required: "Obbligatorio!",
            pattern: {
              value: /^\d{5}$/,
              message: "CAP non valido!",
            },
          })}
          aria-required={true}
          aria-invalid={errors.cap ? "true" : "false"}
          aria-describedby="error-cap"
        />
        <FormError message={errors.cap?.message} id="error-cap" />
      </div>

      {isDirty && (
        <div className="col-span-full">
          <FormButtons
            isSubmitting={isSubmitting}
            onClick={() => reset()}
            isDirty={isDirty}
            defaultText="Modifica informazioni"
            pendingText="Modifica in corso..."
          />
        </div>
      )}
    </form>
  );
}

export default CheckoutForm;
