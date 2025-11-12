import Link from "next/link";

export default function UserAuthIndexPage() {
	return (
		<section className="space-y-6 rounded-xl border border-slate-800 bg-slate-900/60 p-8 shadow-lg">
			<header className="space-y-2">
				<h2 className="text-2xl font-bold text-white">Supabase 인증 샘플</h2>
				<p className="text-sm text-slate-400">
					아래 링크를 통해 이메일/비밀번호 인증, 비밀번호 찾기, 프로필 관리 등 Supabase 예제를 체험할 수 있습니다.
				</p>
			</header>
			<ul className="space-y-3 text-sm text-slate-200">
				<li>
					<Link href="/user/signup" className="font-medium text-blue-400 hover:text-blue-300">
						회원 가입 페이지 이동
					</Link>
				</li>
				<li>
					<Link href="/user/login" className="font-medium text-blue-400 hover:text-blue-300">
						로그인 페이지 이동
					</Link>
				</li>
				<li>
					<Link href="/user/profile" className="font-medium text-blue-400 hover:text-blue-300">
						프로필 관리 페이지 이동
					</Link>
				</li>
				<li>
					<Link href="/user/forgot-password" className="font-medium text-blue-400 hover:text-blue-300">
						비밀번호 찾기 페이지 이동
					</Link>
				</li>
				<li>
					<Link href="/user/reset-password" className="font-medium text-blue-400 hover:text-blue-300">
						비밀번호 재설정 페이지 이동
					</Link>
				</li>
			</ul>
		</section>
	);
}


