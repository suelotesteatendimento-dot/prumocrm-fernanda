export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          nome: string;
          telefone: string;
          procedimento: string;
          origem: "Instagram" | "WhatsApp" | "Indicação" | "Site" | "Tráfego pago" | "Outro";
          status: "em_aberto" | "follow_up" | "aprovado" | "reprovado";
          observacoes: string | null;
          data_entrada: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          nome: string;
          telefone: string;
          procedimento: string;
          origem: "Instagram" | "WhatsApp" | "Indicação" | "Site" | "Tráfego pago" | "Outro";
          status?: "em_aberto" | "follow_up" | "aprovado" | "reprovado";
          observacoes?: string | null;
          data_entrada: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nome?: string;
          telefone?: string;
          procedimento?: string;
          origem?: "Instagram" | "WhatsApp" | "Indicação" | "Site" | "Tráfego pago" | "Outro";
          status?: "em_aberto" | "follow_up" | "aprovado" | "reprovado";
          observacoes?: string | null;
          data_entrada?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
