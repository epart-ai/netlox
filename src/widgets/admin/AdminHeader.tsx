"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/shared/supabase/client";

export default function AdminHeader() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleLogout = async () => {
		try {
			setLoading(true);
			const supabase = createClient();
			await supabase.auth.signOut();
			router.push("/admin/login");
			router.refresh();
		} catch (error) {
			console.error("로그아웃 실패:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
				<h1 className="text-xl font-bold text-white">
					<Link href="/admin/posts">Netlox Admin</Link>
				</h1>
				<nav className="flex items-center gap-6 text-sm text-slate-300">
					<Link href="/admin/users" className="hover:text-white">
						사용자관리
					</Link>
					<Link href="/admin/boards" className="hover:text-white">
						게시판(Slug)관리
					</Link>
					<Link href="/admin/posts" className="hover:text-white">
						게시판(글)관리
					</Link>
					<Link href="/admin/settings" className="hover:text-white">
						이메일설정
					</Link>
					<button
						onClick={handleLogout}
						disabled={loading}
						className="rounded border border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
					>
						{loading ? "로그아웃 중..." : "로그아웃"}
					</button>
				</nav>
			</div>
		</header>
	);
}
