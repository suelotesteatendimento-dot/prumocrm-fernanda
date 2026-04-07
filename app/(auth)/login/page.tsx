import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function LoginPage() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (session) {
      redirect("/dashboard");
    }
  }

  return <LoginForm />;
}
