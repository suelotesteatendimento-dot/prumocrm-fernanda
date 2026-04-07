import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Lead } from "@/lib/types/lead";

export const getLeads = cache(async (): Promise<Lead[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("data_entrada", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Erro ao carregar leads: ${error.message}`);
  }

  return data ?? [];
});
