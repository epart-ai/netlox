"use client";

import Link from "next/link";
import { type FormEvent, useMemo, useState } from "react";

import { requestPasswordReset } from "@/shared/user";

export const dynamic = "force-dynamic";

export default function UserForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const isSubmitDisabled = useMemo(() => loading || !email, [email, loading]);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		setSuccessMessage(null);

		if (!email) {
			setError("이메일을 입력하세요.");
			return;
		}

		try {
			setLoading(true);
			const redirectTo =
				typeof window !== "undefined" ? `${window.location.origin}/user/reset-password` : undefined;

			await requestPasswordReset(email, { redirectTo });

			setSuccessMessage(
				"입력한 이메일 주소로 비밀번호 재설정 링크를 전송했습니다. 받은 편지함을 확인해 주세요.",
			);
		} catch (err) {
			const message = err instanceof Error ? err.message : "비밀번호 재설정 메일 발송에 실패했습니다.";
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="rounded-xl border border-slate-800 bg-slate-900/60 p-8 shadow-lg">
			<header className="mb-8 space-y-2">
				<h2 className="text-2xl font-bold text-white">비밀번호 찾기</h2>
				<p className="text-sm text-slate-400">
					계정에 등록된 이메일을 입력하면 비밀번호 재설정 링크를 발송합니다.
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

				{error && <p className="text-sm text-red-400">{error}</p>}
				{successMessage && <p className="text-sm text-emerald-400">{successMessage}</p>}

				<button
					type="submit"
					disabled={isSubmitDisabled}
					className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
				>
					{loading ? "메일 전송 중..." : "재설정 링크 보내기"}
				</button>
			</form>

			<p className="mt-6 text-sm text-slate-400">
				비밀번호를 기억하셨다면{" "}
				<Link href="/user/login" className="font-medium text-blue-400 hover:text-blue-300">
					로그인 페이지로 이동하세요.
				</Link>
			</p>
		</section>
	);
}


