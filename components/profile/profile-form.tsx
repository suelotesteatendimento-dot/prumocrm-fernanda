"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { profileSchema } from "@/lib/validations/profile";
import type { ProfileFormValues, ProfileSummary } from "@/lib/types/profile";
import { createClient } from "@/lib/supabase/client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ProfileFormProps = {
  profile: ProfileSummary;
};

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile.fullName
    }
  });

  useEffect(() => {
    reset({ full_name: profile.fullName });
  }, [profile.fullName, reset]);

  const previewUrl = useMemo(() => {
    if (!selectedFile) {
      return profile.avatarUrl;
    }

    return URL.createObjectURL(selectedFile);
  }, [profile.avatarUrl, selectedFile]);

  useEffect(() => {
    if (!selectedFile || !previewUrl || previewUrl === profile.avatarUrl) {
      return;
    }

    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl, profile.avatarUrl, selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback(null);
    setErrorMessage(null);
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Selecione uma imagem valida para o perfil.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage("A imagem deve ter no maximo 2 MB.");
      return;
    }

    setSelectedFile(file);
  };

  const onSubmit = (values: ProfileFormValues) => {
    setFeedback(null);
    setErrorMessage(null);

    startTransition(async () => {
      const supabase = createClient();
      let avatarUrl = profile.avatarUrl;

      if (selectedFile) {
        const extension = selectedFile.name.split(".").pop()?.toLowerCase() || "png";
        const filePath = `${profile.id}/avatar.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, selectedFile, {
            upsert: true,
            cacheControl: "3600"
          });

        if (uploadError) {
          setErrorMessage(`Nao foi possivel enviar a foto: ${uploadError.message}`);
          return;
        }

        const {
          data: { publicUrl }
        } = supabase.storage.from("avatars").getPublicUrl(filePath);

        avatarUrl = `${publicUrl}?t=${Date.now()}`;
      }

      const parsed = profileSchema.safeParse(values);

      if (!parsed.success) {
        setErrorMessage(parsed.error.issues[0]?.message ?? "Dados invalidos.");
        return;
      }

      const { error } = await supabase.from("profiles").upsert({
        id: profile.id,
        full_name: parsed.data.full_name,
        avatar_url: avatarUrl
      });

      if (error) {
        setErrorMessage(`Nao foi possivel salvar o perfil: ${error.message}`);
        return;
      }

      await supabase.auth.updateUser({
        data: {
          full_name: parsed.data.full_name,
          avatar_url: avatarUrl
        }
      });

      setSelectedFile(null);
      setFeedback("Perfil atualizado com sucesso.");
      router.refresh();
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
      <Card className="border-brand-300/50">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-[-0.03em]">
            Foto de perfil
          </CardTitle>
          <CardDescription>
            Atualize somente sua imagem de exibicao.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-5">
          <Avatar
            name={profile.fullName}
            src={previewUrl}
            className="h-32 w-32 rounded-[32px] border border-brand-300/45 text-3xl"
          />

          <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-brand-300/60 bg-white/80 px-4 py-3 text-sm font-medium text-brand-950 transition-[background-color,border-color] hover:border-brand-500/55 hover:bg-brand-100/70">
            <Camera className="h-4 w-4" />
            Trocar foto
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>

          <p className="text-center text-xs leading-6 text-brand-600">
            Formatos de imagem comuns sao aceitos, com ate 2 MB.
          </p>
        </CardContent>
      </Card>

      <Card className="border-brand-300/50">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-[-0.03em]">
            Nome de exibicao
          </CardTitle>
          <CardDescription>
            Este nome aparece visualmente no sistema, como no header e na sidebar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-950">Nome</label>
              <Input placeholder="Seu nome" {...register("full_name")} />
              {errors.full_name ? (
                <p className="text-sm text-red-700">{errors.full_name.message}</p>
              ) : null}
            </div>

            {errorMessage ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            ) : null}

            {feedback ? (
              <div className="rounded-2xl border border-brand-300/55 bg-brand-100/55 px-4 py-3 text-sm text-brand-700">
                {feedback}
              </div>
            ) : null}

            <div className="flex justify-end">
              <Button type="submit" className="min-w-[180px]" disabled={isPending}>
                {isPending ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar alteracoes"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
