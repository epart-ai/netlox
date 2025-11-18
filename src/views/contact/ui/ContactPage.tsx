import { ContactForm } from "@/features/contact";

export function ContactPage() {
	return (
		<section className="mx-auto w-full max-w-5xl px-6 py-16 text-white">
			<div className="mb-12 text-center">
				<h1 className="text-4xl font-bold">문의하기</h1>
				<p className="mt-4 text-base text-slate-300">
					아래 정보를 입력해 주시면 담당자가 확인 후 빠르게 연락드리겠습니다.
				</p>
			</div>
			<ContactForm />
		</section>
	);
}

