import type { Session, User } from "@supabase/supabase-js";

export type UserProfile = {
	id: string;
	fullname: string | null;
	companyname: string | null;
	etc1: string | null;
	etc2: string | null;
	etc3: string | null;
	etc4: string | null;
	etc5: string | null;
	created_at?: string | null;
};

export type ProfileInput = Partial<Omit<UserProfile, "id" | "created_at">>;

export type SignUpPayload = {
	email: string;
	password: string;
	profile?: ProfileInput;
};

export type SignInPayload = {
	email: string;
	password: string;
};

export type AuthResult = {
	user: User | null;
};

export type PasswordResetOptions = {
	redirectTo?: string;
};

export type AuthSession = Session | null;



