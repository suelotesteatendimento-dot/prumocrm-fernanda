import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/profiles/queries";
import { ProfileForm } from "@/components/profile/profile-form";

export default async function PerfilPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login");
  }

  return <ProfileForm profile={profile} />;
}
