import type { ReactNode } from "react";
import Link from "next/link";

export default function UserLayout({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen bg-slate-950 text-slate-100">
			<header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur">
				<div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
					<h1 className="text-lg font-semibold">사용자 인증 샘플</h1>
					<nav className="flex flex-wrap gap-4 text-sm text-slate-300">
						<Link href="/user/login" className="transition hover:text-white">
							로그인
						</Link>
						<Link href="/user/signup" className="transition hover:text-white">
							회원 가입
						</Link>
						<Link href="/user/forgot-password" className="transition hover:text-white">
							비밀번호 찾기
						</Link>
						<Link href="/user/profile" className="transition hover:text-white">
							프로필
						</Link>
					</nav>
				</div>
			</header>
			<main className="mx-auto w-full max-w-3xl px-6 py-12">{children}</main>
		</div>
	);
}


