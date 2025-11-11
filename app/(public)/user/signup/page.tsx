"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useMemo, useState } from "react";

import type { ProfileInput } from "@/shared/user";
import { signUpWithProfile } from "@/shared/user";

export const dynamic = "force-dynamic";

const PROFILE_FIELDS: Array<{ key: keyof ProfileInput; label: string; placeholder?: string }> = [
	{ key: "fullname", label: "Full Name", placeholder: "NETLOX" },
	{ key: "companyname", label: "Company Name", placeholder: "NETLOX" },
	{ key: "etc1", label: "기타 정보 1" },
	{ key: "etc2", label: "기타 정보 2" },
	{ key: "etc3", label: "기타 정보 3" },
	{ key: "etc4", label: "기타 정보 4" },
	{ key: "etc5", label: "기타 정보 5" },
];

export default function UserSignupPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [profile, setProfile] = useState<ProfileInput>({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const isSubmitDisabled = useMemo(() => {
		return loading || !email || password.length < 6;
	}, [email, loading, password.length]);

	const handleProfileChange = (key: keyof ProfileInput, value: string) => {
		setProfile((prev) => ({
			...prev,
			[key]: value || undefined,
		}));
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		setSuccessMessage(null);

		if (!email || !password) {
			setError("이메일과 비밀번호를 모두 입력하세요.");
			return;
		}

		try {
			setLoading(true);
			const { user } = await signUpWithProfile({
				email,
				password,
				profile,
			});

			if (!user) {
				throw new Error("회원 가입이 정상적으로 완료되지 않았습니다.");
			}

			setSuccessMessage("회원 가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
			setTimeout(() => {
				router.push("/user/login");
			}, 1500);
		} catch (err) {
			const message = err instanceof Error ? err.message : "회원 가입에 실패했습니다.";
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="rounded-xl border border-slate-800 bg-slate-900/60 p-8 shadow-lg">
			<header className="mb-8 space-y-2">
				<h2 className="text-2xl font-bold text-white">Join Member</h2>
				<p className="text-sm text-slate-400">
					Supabase 인증과 `profiles` 테이블을 이용하여 추가 메타데이터를 저장하는 예시입니다.
				</p>
			</header>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="grid gap-6 md:grid-cols-2">
					<div className="space-y-2 md:col-span-2">
						<label className="block text-sm text-slate-300" htmlFor="email">
							Email
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
					<div className="space-y-2 md:col-span-2">
						<label className="block text-sm text-slate-300" htmlFor="password">
							Password
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

					{PROFILE_FIELDS.map(({ key, label, placeholder }) => (
						<div key={key} className="space-y-2">
							<label className="block text-sm text-slate-300" htmlFor={key}>
								{label}
							</label>
							<input
								id={key}
								type="text"
								value={(profile[key] as string) ?? ""}
								onChange={(event) => handleProfileChange(key, event.target.value)}
								className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
								placeholder={placeholder}
								disabled={loading}
							/>
						</div>
					))}
				</div>

				{error && <p className="text-sm text-red-400">{error}</p>}
				{successMessage && <p className="text-sm text-emerald-400">{successMessage}</p>}

				<button
					type="submit"
					disabled={isSubmitDisabled}
					className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
				>
					{loading ? "가입 처리 중..." : "회원 가입"}
				</button>
			</form>
			<p className="mt-6 text-sm text-slate-400">
				이미 계정이 있으신가요?{" "}
				<Link href="/user/login" className="font-medium text-blue-400 hover:text-blue-300">
					로그인하기
				</Link>
			</p>
		</section>
	);
}


