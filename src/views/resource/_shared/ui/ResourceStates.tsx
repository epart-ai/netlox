type StateProps = {
	title: string;
	message?: string;
};

function Container({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="mx-auto w-full max-w-6xl px-6 py-10">
			<header className="mb-8 space-y-2">
				<h1 className="text-3xl font-bold text-white">{title}</h1>
			</header>
			{children}
		</div>
	);
}

export function ResourceLoading({ title, message = "로딩 중..." }: StateProps) {
	return (
		<Container title={title}>
			<p className="rounded-lg border border-slate-800 bg-slate-900/60 px-6 py-12 text-center text-slate-300">
				{message}
			</p>
		</Container>
	);
}

export function ResourceError({
	title,
	message = "게시글을 불러오지 못했습니다.",
}: StateProps) {
	return (
		<Container title={title}>
			<p className="rounded-lg border border-rose-900/60 bg-rose-950/40 px-6 py-12 text-center text-rose-300">
				{message}
			</p>
		</Container>
	);
}

export function ResourceEmpty({
	title,
	message = "등록된 게시글이 없습니다.",
}: StateProps) {
	return (
		<Container title={title}>
			<p className="rounded-lg border border-slate-800 bg-slate-900/60 px-6 py-12 text-center text-slate-300">
				{message}
			</p>
		</Container>
	);
}
