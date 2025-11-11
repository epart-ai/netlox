import Image from "next/image";
import Link from "next/link";

import { createSupabaseServerClient } from "@/shared/supabase/index.server";

type BoardPost = {
	id: string;
	title: string;
	created_at: string;
	etc1: string | null;
	imageUrl: string | null;
};

export const dynamic = "force-dynamic";

async function fetchBoardPosts(): Promise<BoardPost[]> {
	const supabase = createSupabaseServerClient();

	const { data: posts, error } = await supabase
		.from("posts")
		.select("id, title, created_at, etc1")
		.order("created_at", { ascending: false })
		.limit(30);

	if (error) {
		throw new Error(`게시글 목록을 불러오지 못했습니다: ${error.message}`);
	}

	if (!posts || posts.length === 0) {
		return [];
	}

	const postIds = posts.map((post) => post.id);

	const { data: attachments, error: attachmentsError } = await supabase
		.from("attachments")
		.select("post_id, file_url")
		.in("post_id", postIds)
		.order("created_at", { ascending: true });

	if (attachmentsError) {
		throw new Error(`첨부 파일을 불러오지 못했습니다: ${attachmentsError.message}`);
	}

	const firstImageMap = new Map<string, string>();

	attachments?.forEach((attachment) => {
		if (!attachment?.post_id) {
			return;
		}
		if (!firstImageMap.has(attachment.post_id) && attachment.file_url) {
			firstImageMap.set(attachment.post_id, attachment.file_url);
		}
	});

	return posts.map((post) => ({
		id: post.id,
		title: post.title,
		created_at: post.created_at,
		etc1: post.etc1 ?? null,
		imageUrl: firstImageMap.get(post.id) ?? null,
	}));
}

function formatDate(date: string) {
	return new Intl.DateTimeFormat("ko-KR", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	}).format(new Date(date));
}

export default async function BoardPage() {
	const posts = await fetchBoardPosts();

	return (
		<div className="mx-auto w-full max-w-6xl px-6 py-10">
			<header className="mb-8 space-y-2">
				<h1 className="text-3xl font-bold text-white">게시판</h1>
				<p className="text-sm text-slate-400">등록된 게시글을 확인하고 링크로 이동할 수 있습니다.</p>
			</header>

			{posts.length === 0 ? (
				<p className="rounded-lg border border-slate-800 bg-slate-900/60 px-6 py-12 text-center text-slate-300">
					등록된 게시글이 없습니다.
				</p>
			) : (
				<ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{posts.map((post) => {
						const cardContent = (
							<div className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg transition hover:border-blue-500/60 hover:shadow-blue-500/20">
								<div className="relative h-48 w-full bg-slate-950/60">
									{post.imageUrl ? (
										<Image
											src={post.imageUrl}
											alt={post.title}
											fill
											className="object-cover"
											sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
											priority={false}
										/>
									) : (
										<div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
											이미지가 없습니다
										</div>
									)}
								</div>
								<div className="flex flex-1 flex-col gap-3 p-5">
									<h2 className="text-lg font-semibold text-white line-clamp-2">{post.title}</h2>
									<p className="text-xs text-slate-400">{formatDate(post.created_at)}</p>
									<p className="mt-auto text-xs text-blue-400">
										{post.etc1 ? "링크 열기" : "연결된 링크가 없습니다"}
									</p>
								</div>
							</div>
						);

						const linkHref = post.etc1 || "#";

						return (
							<li key={post.id}>
								{post.etc1 ? (
									<Link href={linkHref} target="_blank" rel="noopener noreferrer">
										{cardContent}
									</Link>
								) : (
									cardContent
								)}
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}


