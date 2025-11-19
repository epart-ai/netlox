import { redirect } from "next/navigation";

import "server-only";

import { createSupabaseServerClient } from "@/shared/supabase/server";

export const dynamic = "force-dynamic";

function getAdminEmails(): string[] {
	const env = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
	return env
		.split(",")
		.map((email) => email.trim().toLowerCase())
		.filter(Boolean);
}

function isAdminEmail(email?: string | null): boolean {
	if (!email) return false;
	const admins = getAdminEmails();
	return admins.includes(email.toLowerCase());
}

export default async function AdminPage() {
	const supabase = createSupabaseServerClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	// 사용자가 없으면 로그인 페이지로
	if (!user) {
		redirect("/admin/login");
	}

	// 관리자 권한 확인
	const byEmail = isAdminEmail(user.email);
	const byRole =
		typeof user.app_metadata?.role === "string" &&
		user.app_metadata.role === "admin";

	// 관리자가 아니면 로그인 페이지로
	if (!byEmail && !byRole) {
		redirect("/admin/login");
	}

	// 관리자 권한이 있으면 사용자 관리 페이지로
	redirect("/admin/users");
}
