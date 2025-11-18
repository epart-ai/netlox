"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { isAdminUser } from "@/shared/admin/admin";
import { createClient } from "@/shared/supabase/client";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	// 이미 관리자 권한이 있으면 리다이렉트
	useEffect(() => {
		const checkAdmin = async () => {
			const supabase = createClient();
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user && isAdminUser(user)) {
				// router.replace 대신 window.location을 사용하여 완전한 리다이렉트
				window.location.href = "/admin/users";
			}
		};
		checkAdmin();
	}, [router]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		if (!email || !password) {
			setError("이메일과 비밀번호를 입력하세요.");
			return;
		}
		try {
			setLoading(true);
			const supabase = createClient();
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (error) throw error;
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!isAdminUser(user)) {
				setError("관리자 권한이 없습니다.");
				return;
			}
			// 완전한 페이지 리로드를 위해 window.location 사용
			window.location.href = "/admin/users";
		} catch (e) {
			setError(e instanceof Error ? e.message : "로그인 실패");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-slate-950">
			<div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
				<div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
					<h1 className="mb-6 text-2xl font-bold text-white">관리자 로그인</h1>
					{error && <p className="mb-4 text-sm text-red-400">{error}</p>}
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label
								htmlFor="admin-email"
								className="mb-2 block text-sm text-slate-300"
							>
								이메일
							</label>
							<input
								id="admin-email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100"
								placeholder="admin@example.com"
							/>
						</div>
						<div>
							<label
								htmlFor="admin-password"
								className="mb-2 block text-sm text-slate-300"
							>
								비밀번호
							</label>
							<input
								id="admin-password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100"
								placeholder="••••••••"
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full rounded bg-blue-600 px-3 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
						>
							{loading ? "로그인 중..." : "로그인"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
