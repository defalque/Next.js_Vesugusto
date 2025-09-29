"use client";

import { useForm } from "react-hook-form";
import FormRow from "./FormRow";
import { updateUserProfile } from "@/app/_lib/actions";
import FormError from "./FormError";
import FormButtons from "./FormButtons";

function UpdateProfileForm({ user, name, email }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      name,
      email,
      via: user.via || "",
      numeroCivico: user.numeroCivico || "",
      cap: user.cap || "",
      comune: user.comune || "",
      phoneNumber: user.phoneNumber || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const toast = (await import("react-hot-toast")).default;
      await toast.promise(updateUserProfile(data), {
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
      className="my-8 flex flex-col gap-4 text-base sm:text-sm md:text-base"
    >
      {/* Nome ed Email */}
      <div className="flex flex-col items-center gap-5 lg:flex-row">
        <div className="flex w-full flex-col space-y-2">
          <FormRow
            id="name"
            label="Nome"
            type="text"
            disabled
            {...register("name")}
          />
        </div>

        <div className="flex w-full flex-col space-y-2">
          <FormRow
            id="email"
            label="Email"
            type="text"
            disabled
            {...register("email")}
          />
        </div>
      </div>

      {/* Via, Numero civico, CAP, Comune e Numero */}
      <div className="grid w-full grid-cols-4 grid-rows-2 gap-5">
        <div className="col-span-full flex w-full flex-col space-y-2 lg:col-span-2">
          <FormRow
            id="via"
            label="Via"
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

        <div className="col-span-2 flex w-full flex-col space-y-2 lg:col-span-1">
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

        <div className="col-span-2 flex w-full flex-col space-y-2 lg:col-span-1">
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

        <div className="col-span-full flex w-full flex-col space-y-2 lg:col-span-2">
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

        <div className="col-span-full flex w-full flex-col space-y-2 lg:col-span-2">
          <FormRow
            id="phoneNumber"
            label="Numero"
            type="text"
            {...register("phoneNumber", {
              // required: "Obbligatorio!",
              minLength: {
                value: 8,
                message: "Numero di telefono deve contenere almeno 8 cifre!",
              },
              maxLength: {
                value: 20,
                message: "Numero di telefono troppo lungo!",
              },
              pattern: {
                value:
                  /^\+?\d{1,4}?[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}$/,
                message: "Numero di telefono non valido",
              },
            })}
            // aria-required={true}
            aria-invalid={errors.phoneNumber ? "true" : "false"}
            aria-describedby="error-phoneNumber"
          />
          <FormError
            message={errors.phoneNumber?.message}
            id="error-phoneNumber"
          />
        </div>
      </div>

      <FormButtons
        isSubmitting={isSubmitting}
        onClick={() => reset()}
        isDirty={isDirty}
        defaultText="Aggiorna profilo"
        pendingText="Aggiornamento in corso..."
      />
    </form>
  );
}

export default UpdateProfileForm;
