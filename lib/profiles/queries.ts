import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { ProfileSummary } from "@/lib/types/profile";

function fallbackNameFromEmail(email?: string | null) {
  if (!email) {
    return "Usuaria";
  }

  return email.split("@")[0] || "Usuaria";
}

export const getCurrentProfile = cache(async (): Promise<ProfileSummary | null> => {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, avatar_url, updated_at")
    .eq("id", user.id)
    .maybeSingle();

  return {
    id: user.id,
    fullName:
      data?.full_name ||
      (typeof user.user_metadata.full_name === "string" ? user.user_metadata.full_name : null) ||
      fallbackNameFromEmail(user.email),
    avatarUrl:
      data?.avatar_url ||
      (typeof user.user_metadata.avatar_url === "string" ? user.user_metadata.avatar_url : null) ||
      null
  };
});
