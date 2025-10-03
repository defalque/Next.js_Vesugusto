import * as z from "zod/mini";

export const updateProfileSchema = z.object({
  comune: z
    .string()
    .check(
      z.trim(),
      z.minLength(1, "Obbligatorio!"),
      z.maxLength(100, "Comune troppo lungo!"),
      z.regex(/^[a-zàèéìòù\s'-]{2,}$/i, "Comune non valido!"),
    ),

  cap: z.string().check(z.trim(), z.regex(/^\d{5}$/, "CAP non valido!")),

  via: z
    .string()
    .check(
      z.trim(),
      z.minLength(5, "La via deve contenere almeno 5 caratteri!"),
      z.regex(
        /^[a-zA-Z0-9\s.'àèéìòù,-]{5,}$/i,
        "La via contiene caratteri non validi!",
      ),
    ),

  numeroCivico: z
    .string()
    .check(
      z.trim(),
      z.minLength(1, "Obbligatorio!"),
      z.maxLength(10, "Numero civico troppo lungo!"),
      z.regex(/^[0-9]+[a-zA-Z]?\/?[0-9a-zA-Z]*$/, "Numero civico non valido!"),
    ),

  phoneNumber: z.optional(
    z.string().check(
      z.trim(),
      z.regex(
        /^\+?\d{1,4}?[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}$/,
        "Numero di telefono non valido",
      ),
      z.refine(
        (val) => val.length >= 8 && val.length <= 20,
        "Numero di telefono deve contenere tra 8 e 20 cifre!",
      ),
    ),
  ),
});
