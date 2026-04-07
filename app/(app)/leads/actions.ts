"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createLeadInsert, createLeadUpdate } from "@/lib/types/lead";
import { createLeadSchema, deleteLeadSchema, updateLeadSchema } from "@/lib/validations/lead";

type ActionState = {
  success: boolean;
  message: string;
};

const successState = (message: string): ActionState => ({
  success: true,
  message
});

const errorState = (message: string): ActionState => ({
  success: false,
  message
});

export async function createLeadAction(payload: unknown): Promise<ActionState> {
  const parsed = createLeadSchema.safeParse(payload);

  if (!parsed.success) {
    return errorState(parsed.error.issues[0]?.message ?? "Dados inválidos.");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert(createLeadInsert(parsed.data));

  if (error) {
    return errorState(`Não foi possível criar o lead: ${error.message}`);
  }

  revalidatePath("/leads");
  return successState("Lead criado com sucesso.");
}

export async function updateLeadAction(payload: unknown): Promise<ActionState> {
  const parsed = updateLeadSchema.safeParse(payload);

  if (!parsed.success) {
    return errorState(parsed.error.issues[0]?.message ?? "Dados inválidos.");
  }

  const { id, ...values } = parsed.data;
  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update(createLeadUpdate({ id, ...values }))
    .eq("id", id);

  if (error) {
    return errorState(`Não foi possível atualizar o lead: ${error.message}`);
  }

  revalidatePath("/leads");
  return successState("Lead atualizado com sucesso.");
}

export async function deleteLeadAction(payload: unknown): Promise<ActionState> {
  const parsed = deleteLeadSchema.safeParse(payload);

  if (!parsed.success) {
    return errorState(parsed.error.issues[0]?.message ?? "Lead inválido.");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").delete().eq("id", parsed.data.id);

  if (error) {
    return errorState(`Não foi possível excluir o lead: ${error.message}`);
  }

  revalidatePath("/leads");
  return successState("Lead excluído com sucesso.");
}
