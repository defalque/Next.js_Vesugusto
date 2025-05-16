import { z } from "zod";
import comuni from "@/app/_lib/gi_comuni_cap.json";

const comuniList = comuni.map((c) => c.denominazione_ita.toLowerCase());

export const updateProfileSchema = z
  .object({
    comune: z.string().trim().toLowerCase(),
    cap: z.string().trim(),
    via: z.string().min(5, "La via non è valida"),
    numeroCivico: z.string().min(1, "Numero civico obbligatorio"),
    phoneNumber: z
      .string()
      .regex(
        /^\+?\d{1,4}?[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}$/,
        "Numero di telefono non valido"
      ),
  })
  .superRefine((data, ctx) => {
    const comuneValido = comuniList.includes(data.comune);
    if (!comuneValido) {
      ctx.addIssue({
        path: ["comune"],
        code: z.ZodIssueCode.custom,
        message: "Comune non valido",
      });
    }

    const capValido = comuni.some(
      (c) =>
        c.denominazione_ita.toLowerCase() === data.comune && c.cap === data.cap
    );
    if (!capValido) {
      ctx.addIssue({
        path: ["cap"],
        code: z.ZodIssueCode.custom,
        message: "CAP non valido per il comune selezionato",
      });
    }
  });
