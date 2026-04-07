"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { leadStatuses } from "@/lib/validations/lead";

const updateLeadStatusSchema = z.object({
  id: z.string().uuid("Lead inválido."),
  status: z.enum(leadStatuses, {
    errorMap: () => ({ message: "Status inválido." })
  })
});

type ActionState = {
  success: boolean;
  message: string;
};

export async function updateLeadStatusAction(payload: unknown): Promise<ActionState> {
  const parsed = updateLeadStatusSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Dados inválidos."
    };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update({ status: parsed.data.status })
    .eq("id", parsed.data.id);

  if (error) {
    return {
      success: false,
      message: `Não foi possível atualizar o status: ${error.message}`
    };
  }

  revalidatePath("/pipeline");
  revalidatePath("/dashboard");
  revalidatePath("/leads");

  return {
    success: true,
    message: "Status atualizado com sucesso."
  };
}
