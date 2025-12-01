import * as z from "zod/mini";

export const updateProfileSchema = z.object({
  city: z
    .string()
    .check(
      z.trim(),
      z.minLength(2, "Nome della città non valido."),
      z.maxLength(33, "Nome della città troppo lungo."),
      z.regex(/^[a-zàèéìòù\s'-]{2,}$/i, "Città non valida."),
    ),

  zipCode: z.string().check(z.trim(), z.regex(/^\d{5}$/, "CAP non valido.")),

  address: z.string().check(
    z.trim(),
    z.minLength(5, "L'indirizzo deve contenere almeno 5 caratteri."),
    z.regex(
      /^[a-zA-Z0-9\s.'àèéìòù,-]{5,}$/i,
      "L'indirizzo contiene caratteri non validi.",
    ),
    z.refine((val) => /[a-zA-Z]/.test(val), {
      message: "L'indirizzo non può contenere solo numeri.",
    }),
  ),

  houseNumber: z.string().check(
    z.trim(),
    z.minLength(1, "Inserisci il numero civico."),
    z.refine((val) => val !== "0", {
      message: "Numero civico non valido.",
    }),
    z.maxLength(10, "Numero civico troppo lungo."),
    z.regex(/^[0-9]+[a-zA-Z]?\/?[0-9a-zA-Z]*$/, "Numero civico non valido."),
  ),

  phoneNumber: z.string().check(
    z.trim(),
    z.regex(
      /^\+?\d{1,4}?[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}$/,
      "Numero di cellulare non valido.",
    ),
    z.refine(
      (val) =>
        val.replace(/\D/g, "").length >= 8 &&
        val.replace(/\D/g, "").length <= 15,
      "Il numero deve contenere tra le 8 e le 15 cifre numeriche.",
    ),
  ),
});
