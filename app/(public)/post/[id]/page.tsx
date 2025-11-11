import { notFound } from "next/navigation";

import { createSupabaseServiceClient } from "@/shared/supabase/index.server";

export const dynamic = "force-dynamic";

type PostRecord = {
	id: string;
	title: string;
	content: string;
	board_slug: string;
	author_name: string | null;
	created_at: string;
	updated_at: string | null;
	etc1: string | null;
	etc2: string | null;
	etc3: string | null;
	etc4: string | null;
	etc5: string | null;
};

type AttachmentRecord = {
	id: string;
	file_url: string;
	file_name: string | null;
	file_size: number | null;
	mime_type: string | null;
	created_at: string;
};

async function fetchPost(id: string): Promise<{ post: PostRecord; attachments: AttachmentRecord[] } | null> {
	const client = createSupabaseServiceClient();

	const { data: postData, error: postError } = await client
		.from("posts")
		.select("*")
		.eq("id", id)
		.maybeSingle();

	if (postError) {
		throw new Error(`게시글 정보를 불러오지 못했습니다: ${postError.message}`);
	}

	const post = (postData ?? null) as PostRecord | null;

	if (!post) {
		return null;
	}

	const { data: attachmentRows, error: attachmentsError } = await client
		.from("attachments")
		.select("*")
		.eq("post_id", id)
		.order("created_at", { ascending: true });

	if (attachmentsError) {
		throw new Error(`첨부 파일 정보를 불러오지 못했습니다: ${attachmentsError.message}`);
	}

	return {
		post,
		attachments: (attachmentRows ?? []) as AttachmentRecord[],
	};
}

function formatDate(value: string) {
	try {
		return new Intl.DateTimeFormat("ko-KR", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		}).format(new Date(value));
	} catch {
		return value;
	}
}

export default async function PostDetailPage({ params }: { params: { id: string } }) {
	const result = await fetchPost(params.id);

	if (!result) {
		notFound();
	}

	const { post, attachments } = result;
	const contentLines =
		post.content?.split("\n").map((line, index) => ({
			id: `${post.id}-${index}`,
			value: line,
		})) ?? [];

	return (
		<div className="min-h-screen bg-slate-950 text-slate-100">
			<div className="mx-auto w-full max-w-4xl px-6 py-12">
				<header className="mb-8 space-y-2">
					<p className="text-sm text-slate-400">보드: {post.board_slug}</p>
					<h1 className="text-3xl font-bold text-white">{post.title}</h1>
					<div className="text-sm text-slate-400">
						<span>작성자: {post.author_name ?? "알 수 없음"}</span>
						<span className="mx-2">•</span>
						<span>작성일: {formatDate(post.created_at)}</span>
						{post.updated_at && (
							<>
								<span className="mx-2">•</span>
								<span>수정일: {formatDate(post.updated_at)}</span>
							</>
						)}
					</div>
				</header>

				<section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
					{contentLines.length > 0 ? (
						contentLines.map((line) => (
							<p key={line.id} className="whitespace-pre-wrap leading-7 text-slate-100">
								{line.value}
							</p>
						))
					) : (
						<p className="text-slate-400">내용이 없습니다.</p>
					)}
				</section>

				{attachments.length > 0 && (
					<section className="mt-8">
						<h2 className="text-lg font-semibold text-white">첨부 파일</h2>
						<ul className="mt-3 space-y-2 text-sm text-blue-400">
							{attachments.map((file) => (
								<li key={file.id}>
									<a
										href={file.file_url}
										target="_blank"
										rel="noreferrer"
										className="hover:text-blue-300 hover:underline"
									>
										{file.file_name || file.file_url}
									</a>
								</li>
							))}
						</ul>
					</section>
				)}

				<section className="mt-10 space-y-2 text-sm text-slate-400">
					<h3 className="font-medium text-slate-300">추가 정보</h3>
					<ul className="space-y-1">
						<li>etc1: {post.etc1 ?? "값 없음"}</li>
						<li>etc2: {post.etc2 ?? "값 없음"}</li>
						<li>etc3: {post.etc3 ?? "값 없음"}</li>
						<li>etc4: {post.etc4 ?? "값 없음"}</li>
						<li>etc5: {post.etc5 ?? "값 없음"}</li>
					</ul>
				</section>
			</div>
		</div>
	);
}


