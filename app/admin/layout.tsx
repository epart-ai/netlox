import "server-only";

import type { Metadata } from "next";
import localFont from "next/font/local";

import "@fontsource-variable/outfit";

import "@/app/globals.css";
import AdminLayoutClient from "./layout-client";

import { AppProviders } from "../providers";
import { createSupabaseServerClient } from "@/shared/supabase/server";

const geistSans = localFont({
	src: "../../public/fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "../../public/fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Netlox",
	description: "Next.js 14 App with modern stack",
};

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

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// 권한 체크 (로그인 페이지 제외는 클라이언트에서 처리)
	const supabase = createSupabaseServerClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	// 사용자가 없거나 관리자가 아니면 로그인 페이지로
	// 단, 클라이언트에서 pathname을 확인해서 로그인 페이지면 리다이렉트 안 함
	if (!user) {
		// 로그인 페이지가 아닐 때만 리다이렉트
		// 클라이언트 컴포넌트에서 pathname 확인 후 처리
	}

	// 관리자 권한 확인
	const byEmail = user ? isAdminEmail(user.email) : false;
	const byRole =
		user && typeof user.app_metadata?.role === "string"
			? user.app_metadata.role === "admin"
			: false;

	// 관리자가 아니면 로그인 페이지로 리다이렉트 (로그인 페이지는 클라이언트에서 제외)
	if (user && !byEmail && !byRole) {
		// 클라이언트 컴포넌트에서 pathname 확인 후 처리
	}

	return (
		<html lang="ko">
			<body
				className={`${geistSans.variable} ${geistMono.variable} bg-blue-100 leading-[normal] text-white antialiased`}
			>
				<AppProviders>
					<AdminLayoutClient user={user} isAdmin={byEmail || byRole}>
						{children}
					</AdminLayoutClient>
				</AppProviders>
			</body>
		</html>
	);
}
