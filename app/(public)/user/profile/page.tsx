"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { ProfileInput, UserProfile } from "@/shared/user";
import { getCurrentUserProfile, signOut, upsertCurrentUserProfile } from "@/shared/user";

type ViewState =
	| { status: "loading" }
	| { status: "error"; message: string }
	| { status: "ready"; profile: UserProfile | null };

const PROFILE_FIELD_LABELS: Record<keyof ProfileInput, string> = {
	fullname: "이름",
	companyname: "회사명",
	etc1: "기타 정보 1",
	etc2: "기타 정보 2",
	etc3: "기타 정보 3",
	etc4: "기타 정보 4",
	etc5: "기타 정보 5",
};

export const dynamic = "force-dynamic";

export default function UserProfilePage() {
	const router = useRouter();
	const [state, setState] = useState<ViewState>({ status: "loading" });
	const [form, setForm] = useState<ProfileInput>({});
	const [isSaving, setIsSaving] = useState(false);
	const [feedback, setFeedback] = useState<string | null>(null);

	useEffect(() => {
		let mounted = true;

		const loadProfile = async () => {
			try {
				const profile = await getCurrentUserProfile();
				if (!mounted) return;
				setState({ status: "ready", profile });
				setForm({
					fullname: profile?.fullname ?? undefined,
					companyname: profile?.companyname ?? undefined,
					etc1: profile?.etc1 ?? undefined,
					etc2: profile?.etc2 ?? undefined,
					etc3: profile?.etc3 ?? undefined,
					etc4: profile?.etc4 ?? undefined,
					etc5: profile?.etc5 ?? undefined,
				});
			} catch (err) {
				if (!mounted) return;
				const message = err instanceof Error ? err.message : "프로필 정보를 불러오지 못했습니다.";
				setState({ status: "error", message });
			}
		};

		loadProfile();

		return () => {
			mounted = false;
		};
	}, []);

	const handleChange = (key: keyof ProfileInput, value: string) => {
		setForm((prev) => ({
			...prev,
			[key]: value || undefined,
		}));
	};

	const handleSave = async () => {
		setIsSaving(true);
		setFeedback(null);

		try {
			const profile = await upsertCurrentUserProfile(form);
			setState({ status: "ready", profile });
			setFeedback("프로필이 저장되었습니다.");
		} catch (err) {
			const message = err instanceof Error ? err.message : "프로필 저장에 실패했습니다.";
			setFeedback(message);
		} finally {
			setIsSaving(false);
		}
	};

	const handleSignOut = async () => {
		try {
			await signOut();
			router.push("/user/login");
		} catch (err) {
			const message = err instanceof Error ? err.message : "로그아웃에 실패했습니다.";
			setFeedback(message);
		}
	};

	if (state.status === "loading") {
		return <p className="text-slate-300">프로필을 불러오는 중...</p>;
	}

	if (state.status === "error") {
		return (
			<div className="space-y-4 rounded-lg border border-rose-900/60 bg-rose-950/40 p-6 text-rose-200">
				<p>프로필을 불러오는 중 문제가 발생했습니다.</p>
				<p className="text-sm text-rose-300/80">{state.message}</p>
				<button
					type="button"
					onClick={() => router.push("/user/login")}
					className="rounded bg-rose-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600"
				>
					로그인 페이지로 이동
				</button>
			</div>
		);
	}

	return (
		<section className="space-y-6 rounded-xl border border-slate-800 bg-slate-900/60 p-8 shadow-lg">
			<header className="space-y-2">
				<h2 className="text-2xl font-bold text-white">내 프로필</h2>
				<p className="text-sm text-slate-400">
					Supabase에서 저장한 `profiles` 테이블 데이터를 조회 및 업데이트하는 예시입니다.
				</p>
			</header>

			<div className="space-y-4">
				{(Object.keys(PROFILE_FIELD_LABELS) as Array<keyof ProfileInput>).map((key) => (
					<div key={key} className="space-y-2">
						<label className="block text-sm text-slate-300" htmlFor={key}>
							{PROFILE_FIELD_LABELS[key]}
						</label>
						<input
							id={key}
							type="text"
							value={(form[key] as string) ?? ""}
							onChange={(event) => handleChange(key, event.target.value)}
							className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
							placeholder="필요 시 입력하세요"
							disabled={isSaving}
						/>
					</div>
				))}
			</div>

			{feedback && <p className="text-sm text-emerald-400">{feedback}</p>}

			<div className="flex flex-wrap gap-3">
				<button
					type="button"
					onClick={handleSave}
					disabled={isSaving}
					className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
				>
					{isSaving ? "저장 중..." : "저장하기"}
				</button>
				<button
					type="button"
					onClick={handleSignOut}
					className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-700"
				>
					로그아웃
				</button>
			</div>
		</section>
	);
}


