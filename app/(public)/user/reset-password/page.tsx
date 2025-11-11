"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useMemo, useState } from "react";

import { getCurrentSession, updatePassword } from "@/shared/user";

type ViewState =
	| { status: "loading" }
	| { status: "ready" }
	| { status: "no-session" }
	| { status: "error"; message: string };

export const dynamic = "force-dynamic";

export default function UserResetPasswordPage() {
	const router = useRouter();
	const [state, setState] = useState<ViewState>({ status: "loading" });
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [feedback, setFeedback] = useState<string | null>(null);

	useEffect(() => {
		let mounted = true;

		const ensureSession = async () => {
			try {
				const session = await getCurrentSession();
				if (!mounted) return;
				if (session?.user) {
					setState({ status: "ready" });
				} else {
					setState({ status: "no-session" });
				}
			} catch (err) {
				if (!mounted) return;
				const message = err instanceof Error ? err.message : "세션 확인 중 오류가 발생했습니다.";
				setState({ status: "error", message });
			}
		};

		ensureSession();

		return () => {
			mounted = false;
		};
	}, []);

	const isSubmitDisabled = useMemo(() => {
		return loading || password.length < 6 || password !== confirmPassword;
	}, [confirmPassword, loading, password]);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFeedback(null);

		if (password !== confirmPassword) {
			setFeedback("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
			return;
		}

		try {
			setLoading(true);
			await updatePassword(password);
			setFeedback("비밀번호가 변경되었습니다. 잠시 후 로그인 페이지로 이동합니다.");
			setTimeout(() => {
				router.push("/user/login");
			}, 1500);
		} catch (err) {
			const message = err instanceof Error ? err.message : "비밀번호 변경에 실패했습니다.";
			setFeedback(message);
		} finally {
			setLoading(false);
		}
	};

	if (state.status === "loading") {
		return <p className="text-slate-300">비밀번호 재설정 세션을 확인하는 중입니다...</p>;
	}

	if (state.status === "error") {
		return (
			<div className="space-y-4 rounded-lg border border-rose-900/60 bg-rose-950/40 p-6 text-rose-200">
				<p>비밀번호 재설정을 진행할 수 없습니다.</p>
				<p className="text-sm text-rose-300/80">{state.message}</p>
				<Link
					href="/user/forgot-password"
					className="inline-block rounded bg-rose-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600"
				>
					다시 시도하기
				</Link>
			</div>
		);
	}

	if (state.status === "no-session") {
		return (
			<section className="space-y-4 rounded-lg border border-slate-800 bg-slate-900/60 p-8 text-slate-200">
				<p>유효한 비밀번호 재설정 링크가 확인되지 않았습니다.</p>
				<p className="text-sm text-slate-400">
					비밀번호 재설정 이메일의 링크를 클릭하여 다시 이 페이지에 접근해 주세요.
				</p>
				<Link
					href="/user/forgot-password"
					className="inline-block w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
				>
					재설정 메일 다시 보내기
				</Link>
			</section>
		);
	}

	return (
		<section className="space-y-6 rounded-xl border border-slate-800 bg-slate-900/60 p-8 shadow-lg">
			<header className="space-y-2">
				<h2 className="text-2xl font-bold text-white">비밀번호 재설정</h2>
				<p className="text-sm text-slate-400">
					새로운 비밀번호를 입력한 뒤 저장하면 즉시 적용됩니다.
				</p>
			</header>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="space-y-2">
					<label className="block text-sm text-slate-300" htmlFor="password">
						새 비밀번호
					</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
						placeholder="6자 이상 입력하세요"
						autoComplete="new-password"
						disabled={loading}
					/>
				</div>
				<div className="space-y-2">
					<label className="block text-sm text-slate-300" htmlFor="confirmPassword">
						새 비밀번호 확인
					</label>
					<input
						id="confirmPassword"
						type="password"
						value={confirmPassword}
						onChange={(event) => setConfirmPassword(event.target.value)}
						className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
						placeholder="다시 한 번 입력하세요"
						autoComplete="new-password"
						disabled={loading}
					/>
				</div>

				{feedback && <p className="text-sm text-emerald-400">{feedback}</p>}

				<button
					type="submit"
					disabled={isSubmitDisabled}
					className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
				>
					{loading ? "변경 중..." : "비밀번호 변경"}
				</button>
			</form>
		</section>
	);
}


