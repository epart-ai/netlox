type StateProps = {
	message?: string;
};

export function ResourceError({
	message = "게시글을 불러오지 못했습니다.",
}: StateProps) {
	return (
		<p className="rounded-lg border border-rose-900/60 bg-rose-950/40 px-6 py-12 text-center text-rose-300">
			{message}
		</p>
	);
}

export function ResourceEmpty({
	message = "등록된 게시글이 없습니다.",
}: StateProps) {
	return (
		<p className="rounded-lg border border-slate-800 bg-slate-900/60 px-6 py-12 text-center text-slate-300">
			{message}
		</p>
	);
}
