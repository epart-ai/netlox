"use client";

import { createClient } from "@/shared/supabase/client";

import type {
	AuthResult,
	AuthSession,
	PasswordResetOptions,
	ProfileInput,
	SignInPayload,
	SignUpPayload,
	UserProfile,
} from "./types";

const PROFILE_TABLE = "profiles";

function mapProfileRow(row: Record<string, unknown>): UserProfile {
	return {
		id: String(row.id),
		fullname: (row.fullname as string) ?? null,
		companyname: (row.companyname as string) ?? null,
		etc1: (row.etc1 as string) ?? null,
		etc2: (row.etc2 as string) ?? null,
		etc3: (row.etc3 as string) ?? null,
		etc4: (row.etc4 as string) ?? null,
		etc5: (row.etc5 as string) ?? null,
		created_at: (row.created_at as string) ?? null,
	};
}

export async function signUpWithProfile(payload: SignUpPayload): Promise<AuthResult> {
	const supabase = createClient();
	const { email, password, profile } = payload;

	const { data, error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) {
		throw new Error(error.message);
	}

	const user = data.user;

	if (user && profile) {
		const { error: profileError } = await supabase.from(PROFILE_TABLE).upsert({
			id: user.id,
			fullname: profile.fullname ?? null,
			companyname: profile.companyname ?? null,
			etc1: profile.etc1 ?? null,
			etc2: profile.etc2 ?? null,
			etc3: profile.etc3 ?? null,
			etc4: profile.etc4 ?? null,
			etc5: profile.etc5 ?? null,
		});

		if (profileError) {
			throw new Error(profileError.message);
		}
	}

	return { user };
}

export async function signInWithEmail(payload: SignInPayload): Promise<AuthResult> {
	const supabase = createClient();
	const { email, password } = payload;

	const { data, error } = await supabase.auth.signInWithPassword({ email, password });

	if (error) {
		throw new Error(error.message);
	}

	return { user: data.user };
}

export async function signOut(): Promise<void> {
	const supabase = createClient();
	const { error } = await supabase.auth.signOut();

	if (error) {
		throw new Error(error.message);
	}
}

export async function getCurrentUserProfile(): Promise<UserProfile | null> {
	const supabase = createClient();
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError) {
		throw new Error(authError.message);
	}

	if (!user) {
		return null;
	}

	const { data, error } = await supabase.from(PROFILE_TABLE).select("*").eq("id", user.id).maybeSingle();

	if (error) {
		throw new Error(error.message);
	}

	return data ? mapProfileRow(data) : null;
}

export async function upsertCurrentUserProfile(profile: ProfileInput): Promise<UserProfile> {
	const supabase = createClient();
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError) {
		throw new Error(authError.message);
	}

	if (!user) {
		throw new Error("로그인이 필요합니다.");
	}

	const payload = {
		id: user.id,
		fullname: profile.fullname ?? null,
		companyname: profile.companyname ?? null,
		etc1: profile.etc1 ?? null,
		etc2: profile.etc2 ?? null,
		etc3: profile.etc3 ?? null,
		etc4: profile.etc4 ?? null,
		etc5: profile.etc5 ?? null,
	};

	const { data, error } = await supabase.from(PROFILE_TABLE).upsert(payload).select().single();

	if (error) {
		throw new Error(error.message);
	}

	return mapProfileRow(data);
}

export async function requestPasswordReset(email: string, options?: PasswordResetOptions): Promise<void> {
	const supabase = createClient();
	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: options?.redirectTo,
	});

	if (error) {
		throw new Error(error.message);
	}
}

export async function updatePassword(newPassword: string): Promise<void> {
	const supabase = createClient();
	const { error } = await supabase.auth.updateUser({ password: newPassword });

	if (error) {
		throw new Error(error.message);
	}
}

export async function getCurrentSession(): Promise<AuthSession> {
	const supabase = createClient();
	const {
		data: { session },
		error,
	} = await supabase.auth.getSession();

	if (error) {
		throw new Error(error.message);
	}

	return session;
}


