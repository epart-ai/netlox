import { createClient } from "@/shared/supabase/client";

export function getAdminEmails(): string[] {
	const env = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
	return env
		.split(",")
		.map((email) => email.trim().toLowerCase())
		.filter(Boolean);
}

export function isAdminEmail(email?: string | null): boolean {
	if (!email) return false;
	const admins = getAdminEmails();
	return admins.includes(email.toLowerCase());
}

type AdminLikeUser = {
	email?: string | null;
	app_metadata?: Record<string, unknown>;
} | null | undefined;

export function isAdminUser(user: AdminLikeUser): boolean {
	if (!user) return false;
	const byEmail = isAdminEmail(user.email ?? null);
	const appMetadata = user.app_metadata as Record<string, unknown> | undefined;
	const byRole = typeof appMetadata?.role === "string" && appMetadata.role === "admin";
	return byEmail || byRole;
}

export async function requireAdmin(): Promise<{
	ok: boolean;
	reason?: "not_authenticated" | "not_authorized";
}> {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return { ok: false, reason: "not_authenticated" };
	if (!isAdminUser(user)) return { ok: false, reason: "not_authorized" };
	return { ok: true };
}


