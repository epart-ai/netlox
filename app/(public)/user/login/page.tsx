"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { signInWithEmail } from "@/shared/user";

export const dynamic = "force-dynamic";

export default function UserLoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);

		if (!email || !password) {
			setError("이메일과 비밀번호를 모두 입력하세요.");
			return;
		}

		try {
			setLoading(true);
			await signInWithEmail({ email, password });
			router.push("/user/profile");
		} catch (err) {
			const message = err instanceof Error ? err.message : "로그인에 실패했습니다.";
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="rounded-xl border border-slate-800 bg-slate-900/60 p-8 shadow-lg">
			<header className="mb-8 space-y-2">
				<h2 className="text-2xl font-bold text-white">로그인</h2>
				<p className="text-sm text-slate-400">
					Supabase 이메일/비밀번호 인증을 사용한 로그인 예시입니다.
				</p>
			</header>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="space-y-2">
					<label className="block text-sm text-slate-300" htmlFor="email">
						이메일
					</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
						placeholder="you@example.com"
						autoComplete="email"
						disabled={loading}
					/>
				</div>
				<div className="space-y-2">
					<label className="block text-sm text-slate-300" htmlFor="password">
						비밀번호
					</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
						placeholder="8자 이상 입력하세요"
						autoComplete="current-password"
						disabled={loading}
					/>
				</div>

				{error && <p className="text-sm text-red-400">{error}</p>}

				<button
					type="submit"
					disabled={loading}
					className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
				>
					{loading ? "로그인 중..." : "로그인"}
				</button>
			</form>
			<p className="mt-6 text-sm text-slate-400">
				계정이 없으신가요?{" "}
				<Link href="/user/signup" className="font-medium text-blue-400 hover:text-blue-300">
					회원 가입하기
				</Link>
			</p>
		</section>
	);
}


