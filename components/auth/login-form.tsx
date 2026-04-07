"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LogoMark } from "@/components/app/logo-mark";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

const loginSchema = z.object({
  email: z.string().email("Informe um e-mail valido."),
  password: z.string().min(6, "A senha precisa ter ao menos 6 caracteres.")
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "fernanda@mbw.com.br",
      password: "123456"
    }
  });

  const onSubmit = async (values: LoginValues) => {
    setAuthError(null);

    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password
    });

    console.log("[auth] signInWithPassword result", data);
    console.error("[auth] signInWithPassword error", error);

    if (error) {
      setAuthError(error.message);
      return;
    }

    const sessionResult = await supabase.auth.getSession();
    console.log("[auth] session after login", sessionResult.data.session);
    console.error("[auth] session after login error", sessionResult.error);

    if (!sessionResult.data.session) {
      setAuthError("Login realizado, mas a sessao nao foi persistida.");
      return;
    }

    router.replace("/dashboard");
    router.refresh();
  };

  return (
    <div className="grid min-h-screen bg-[linear-gradient(180deg,#111111_0%,#1A1A1A_100%)] lg:grid-cols-[1.08fr_0.92fr]">
      <section className="hidden border-r border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(200,176,138,0.16),transparent_24%),linear-gradient(180deg,#111111_0%,#1A1A1A_100%)] p-12 lg:flex lg:flex-col lg:justify-between">
        <div>
          <LogoMark inverted />
        </div>
        <div className="max-w-xl">
          <p className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-brand-300">
            CRM MBW
          </p>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-brand-100 xl:text-6xl">
            Gestao comercial sofisticada, clara e focada no essencial.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-brand-300/85">
            Acompanhe leads, clientes e oportunidades com uma interface limpa,
            elegante e pronta para o dia a dia da clinica.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:bg-[linear-gradient(180deg,rgba(247,243,238,0.02),rgba(247,243,238,0.06))] lg:px-12">
        <Card className="w-full max-w-md border-brand-300/55 bg-[linear-gradient(180deg,rgba(247,243,238,0.98),rgba(255,255,255,0.96))] shadow-[0_28px_60px_-34px_rgba(0,0,0,0.55)]">
          <CardHeader className="space-y-3">
            <p className="text-sm font-medium text-brand-600">Acesso seguro</p>
            <CardTitle className="text-3xl font-semibold tracking-[-0.03em] text-brand-950">
              Entrar
            </CardTitle>
            <CardDescription className="text-brand-600">
              Base de acesso inicial pronta para integrar com Supabase Auth.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-950">E-mail</label>
                <Input
                  type="email"
                  className="border-brand-300/65 bg-white text-brand-950 placeholder:text-brand-600/70 focus-visible:border-brand-500 focus-visible:ring-brand-500/20"
                  {...register("email")}
                />
                {errors.email ? (
                  <p className="text-sm text-red-700">{errors.email.message}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-950">Senha</label>
                <Input
                  type="password"
                  className="border-brand-300/65 bg-white text-brand-950 placeholder:text-brand-600/70 focus-visible:border-brand-500 focus-visible:ring-brand-500/20"
                  {...register("password")}
                />
                {errors.password ? (
                  <p className="text-sm text-red-700">{errors.password.message}</p>
                ) : null}
              </div>

              {authError ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {authError}
                </div>
              ) : null}

              <Button
                className="w-full bg-brand-500 text-brand-950 hover:bg-brand-400"
                size="lg"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Entrando..." : "Acessar CRM"}
              </Button>
            </form>

            <div className="mt-6 rounded-2xl border border-brand-300/45 bg-brand-100/55 p-4 text-sm text-brand-600">
              A navegacao inicial ja esta pronta:
              {" "}
              <Link href="/dashboard" className="font-medium text-brand-950 underline">
                ir para dashboard
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
