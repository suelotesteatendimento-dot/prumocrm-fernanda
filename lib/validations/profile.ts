import { z } from "zod";

export const profileSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, "Informe um nome com pelo menos 2 caracteres.")
    .max(80, "O nome deve ter no maximo 80 caracteres.")
});
