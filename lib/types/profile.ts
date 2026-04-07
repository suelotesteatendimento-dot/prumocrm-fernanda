export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string | null;
};

export type ProfileFormValues = {
  full_name: string;
};

export type ProfileSummary = {
  id: string;
  fullName: string;
  avatarUrl: string | null;
};
