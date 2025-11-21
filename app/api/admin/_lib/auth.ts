"use server";

import { createClient } from "@supabase/supabase-js";
import type { User } from "@supabase/supabase-js";

type EnsureAdminResult =
	| {
			ok: true;
			token: string;
			user: User;
	  }
	| { ok: false };

function normalizeAdminEmails(value: string | undefined | null): string[] {
	return (value || "")
		.split(",")
		.map((item) => item.trim().toLowerCase())
		.filter(Boolean);
}

export async function ensureAdminFromBearer(
	request: Request,
): Promise<EnsureAdminResult> {
	const authHeader = request.headers.get("authorization") ?? "";
	const token = authHeader.toLowerCase().startsWith("bearer ")
		? authHeader.slice(7)
		: "";

	if (!token) {
		return { ok: false };
	}

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !anonKey) {
		return { ok: false };
	}

	const client = createClient(supabaseUrl, anonKey, {
		global: {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
		auth: {
			autoRefreshToken: false,
			persistSession: false,
			detectSessionInUrl: false,
		},
	});

	const {
		data: { user },
		error,
	} = await client.auth.getUser();

	if (error || !user) {
		return { ok: false };
	}

	const admins = normalizeAdminEmails(process.env.NEXT_PUBLIC_ADMIN_EMAILS);
	const byEmail = user.email
		? admins.includes(user.email.toLowerCase())
		: false;
	const byRole = user.app_metadata?.role === "admin";

	if (!byEmail && !byRole) {
		return { ok: false };
	}

	return { ok: true, token, user };
}
