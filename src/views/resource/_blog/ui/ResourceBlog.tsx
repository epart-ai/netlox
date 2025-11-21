import Image from "next/image";
import Link from "next/link";

import type { Board } from "@/shared/board/types/board";
import { createSupabaseServerClient } from "@/shared/supabase/index.server";

type BoardPost = {
	id: string;
	title: string;
	created_at: string;
	etc1: string | null;
	imageUrl: string | null;
};

export const dynamic = "force-dynamic";

async function fetchBoard(slug: string): Promise<Board | null> {
	const supabase = createSupabaseServerClient();
	const { data, error } = await supabase
		.from("boards")
		.select("*")
		.eq("slug", slug)
		.single();

	if (error) {
		return null;
	}
	return data;
}

async function fetchBoardPosts(
	slug: string,
	page: number = 1,
	limit: number = 30,
): Promise<{ posts: BoardPost[]; total: number }> {
	const supabase = createSupabaseServerClient();

	const query = supabase
		.from("posts")
		.select("id, title, created_at, etc1", { count: "exact" })
		.eq("board_slug", slug)
		.order("created_at", { ascending: false });

	const from = (page - 1) * limit;
	const to = from + limit - 1;

	const { data: posts, error, count } = await query.range(from, to);

	if (error) {
		throw new Error(`게시글 목록을 불러오지 못했습니다: ${error.message}`);
	}

	if (!posts || posts.length === 0) {
		return { posts: [], total: count || 0 };
	}

	const postIds = posts.map((post) => post.id);

	const { data: attachments, error: attachmentsError } = await supabase
		.from("attachments")
		.select("post_id, file_url")
		.in("post_id", postIds)
		.order("created_at", { ascending: true });

	if (attachmentsError) {
		throw new Error(
			`첨부 파일을 불러오지 못했습니다: ${attachmentsError.message}`,
		);
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

	return {
		posts: posts.map((post) => ({
			id: post.id,
			title: post.title,
			created_at: post.created_at,
			etc1: post.etc1 ?? null,
			imageUrl: firstImageMap.get(post.id) ?? null,
		})),
		total: count || 0,
	};
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

type ResourceBlogProps = {
	searchParams?: { page?: string };
};

export async function ResourceBlog({ searchParams }: ResourceBlogProps) {
	const boardSlug = "blog";
	const board = await fetchBoard(boardSlug);
	const usePagination = board?.use_pagination ?? false;
	const postsPerPage = board?.posts_per_page ?? 10;

	const currentPage = searchParams?.page ? parseInt(searchParams.page, 10) : 1;

	const { posts, total } = await fetchBoardPosts(
		boardSlug,
		usePagination ? currentPage : 1,
		usePagination ? postsPerPage : 30,
	);

	const totalPages = usePagination ? Math.ceil(total / postsPerPage) : 1;

	return (
		<div className="mx-auto w-full max-w-6xl px-6 py-10">
			<header className="mb-8 space-y-2">
				<h1 className="text-3xl font-bold text-white">Blog</h1>
			</header>

			{posts.length === 0 ? (
				<p className="rounded-lg border border-slate-800 bg-slate-900/60 px-6 py-12 text-center text-slate-300">
					등록된 게시글이 없습니다.
				</p>
			) : (
				<>
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
										<h2 className="line-clamp-2 text-lg font-semibold text-white">
											{post.title}
										</h2>
										<p className="text-xs text-slate-400">
											{formatDate(post.created_at)}
										</p>
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
										<Link
											href={linkHref}
											target="_blank"
											rel="noopener noreferrer"
										>
											{cardContent}
										</Link>
									) : (
										cardContent
									)}
								</li>
							);
						})}
					</ul>

					{usePagination && (
						<div className="mt-8 flex items-center justify-center gap-2">
							{currentPage > 1 && (
								<Link
									href={`/resource/blog?page=${currentPage - 1}`}
									className="rounded border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
								>
									이전
								</Link>
							)}

							{Array.from({ length: totalPages }, (_, i) => i + 1).map(
								(page) => {
									if (
										page === 1 ||
										page === totalPages ||
										(page >= currentPage - 1 && page <= currentPage + 1)
									) {
										return (
											<Link
												key={page}
												href={`/resource/blog?page=${page}`}
												className={`rounded px-4 py-2 text-sm transition ${
													currentPage === page
														? "bg-blue-600 text-white"
														: "border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
												}`}
											>
												{page}
											</Link>
										);
									}
									if (page === currentPage - 2 || page === currentPage + 2) {
										return (
											<span key={page} className="px-2 text-sm text-slate-400">
												...
											</span>
										);
									}
									return null;
								},
							)}

							{currentPage < totalPages && (
								<Link
									href={`/resource/blog?page=${currentPage + 1}`}
									className="rounded border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
								>
									다음
								</Link>
							)}
						</div>
					)}
				</>
			)}
		</div>
	);
}
