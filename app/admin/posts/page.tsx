"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { boardService } from "@/shared/board/board";
import { boardsService } from "@/shared/board/boards";
import type { Board, Post } from "@/shared/board/types/board";
import { createClient } from "@/shared/supabase/client";

export const dynamic = "force-dynamic";

const PER_PAGE = 20;

export default function AdminPostsPage() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [posts, setPosts] = useState<Post[]>([]);
	const [board, setBoard] = useState<string>("");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [boards, setBoards] = useState<Board[]>([]);

	const loadBoards = useCallback(async () => {
		try {
			const list = await boardsService.listAll();
			setBoards(list);
		} catch (err) {
			console.error("보드 목록을 불러오지 못했습니다.", err);
		}
	}, []);

	const loadPosts = useCallback(
		async (nextPage: number, selectedBoard: string) => {
			try {
				setLoading(true);
				const { posts: fetchedPosts, total } = await boardService.getPosts(
					nextPage,
					PER_PAGE,
					{
						boardSlug: selectedBoard || undefined,
					},
				);
				setPosts(fetchedPosts);
				setTotalPages(Math.max(1, Math.ceil(total / PER_PAGE)));
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "목록을 불러오지 못했습니다.",
				);
			} finally {
				setLoading(false);
			}
		},
		[],
	);

	useEffect(() => {
		Promise.all([loadBoards(), loadPosts(1, "")]);
	}, [loadBoards, loadPosts]);

	useEffect(() => {
		loadPosts(page, board);
	}, [board, page, loadPosts]);

	const handleDelete = async (postId: string) => {
		if (!confirm("삭제하시겠습니까?")) return;
		try {
			const supabase = createClient();
			const {
				data: { session },
			} = await supabase.auth.getSession();
			const headers: Record<string, string> = session?.access_token
				? { Authorization: `Bearer ${session.access_token}` }
				: {};
			const response = await fetch(`/api/admin/posts/${postId}`, {
				method: "DELETE",
				headers,
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error || "삭제 실패");
			loadPosts(page, board);
		} catch (err) {
			const message = err instanceof Error ? err.message : "삭제 실패";
			alert(message);
		}
	};

	const boardOptions = useMemo(
		() =>
			boards.map((item) => (
				<option key={item.slug} value={item.slug}>
					{item.name}
				</option>
			)),
		[boards],
	);

	return (
		<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<div className="rounded-lg border border-slate-800 bg-slate-900 shadow">
				<div className="border-b border-slate-800 px-6 py-4">
					<div className="flex items-center justify-between">
						<h1 className="text-2xl font-bold text-white">관리자 - 게시글</h1>
						<div className="flex gap-2">
							<select
								value={board}
								onChange={(event) => {
									setBoard(event.target.value);
									setPage(1);
								}}
								className="rounded border border-slate-700 bg-slate-800 px-2 py-2 text-slate-100"
							>
								<option value="">보드 전체</option>
								{boardOptions}
							</select>
							<Link
								href="/admin/posts/new"
								className="ml-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
							>
								새 글
							</Link>
						</div>
					</div>
				</div>

				<div className="p-6">
					{loading ? (
						<p className="text-slate-300">불러오는 중...</p>
					) : error ? (
						<p className="text-red-400">{error}</p>
					) : (
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y divide-slate-800">
								<thead className="bg-slate-800/60">
									<tr>
										<th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-200">
											보드
										</th>
										<th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-200">
											제목
										</th>
										<th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-200">
											작성자
										</th>
										<th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-200">
											관리
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-slate-800">
									{posts.map((p) => (
										<tr key={p.id} className="hover:bg-slate-800/40">
											<td className="px-4 py-2 text-sm text-slate-200">
												{p.board_slug}
											</td>
											<td className="px-4 py-2">
												<Link
													href={`/admin/posts/${p.id}`}
													className="text-blue-400 hover:text-blue-300 hover:underline"
												>
													{p.title}
												</Link>
											</td>
											<td className="px-4 py-2 text-sm text-slate-200">
												{p.author_name}
											</td>
											<td className="px-4 py-2">
												<div className="flex gap-3 text-sm">
													<Link
														href={`/admin/posts/${p.id}/edit`}
														className="text-blue-400 hover:text-blue-300 hover:underline"
													>
														수정
													</Link>
													<button
														type="button"
														onClick={() => handleDelete(p.id)}
														className="text-red-400 hover:text-red-300 hover:underline"
													>
														삭제
													</button>
												</div>
											</td>
										</tr>
									))}
									{posts.length === 0 && (
										<tr>
											<td
												colSpan={4}
												className="px-4 py-8 text-center text-slate-400"
											>
												데이터가 없습니다.
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					)}
				</div>

				{totalPages > 1 && (
					<div className="border-t border-slate-800 px-6 py-4">
						<div className="flex justify-center gap-2">
							<button
								type="button"
								onClick={() => setPage((p) => Math.max(1, p - 1))}
								disabled={page === 1}
								className="rounded border border-slate-700 px-3 py-1 text-slate-200 disabled:opacity-50"
							>
								이전
							</button>
							{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
								<button
									type="button"
									key={p}
									onClick={() => setPage(p)}
									className={`rounded border border-slate-700 px-3 py-1 text-slate-200 ${p === page ? "bg-blue-600 text-white" : ""}`}
								>
									{p}
								</button>
							))}
							<button
								type="button"
								onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
								disabled={page === totalPages}
								className="rounded border border-slate-700 px-3 py-1 text-slate-200 disabled:opacity-50"
							>
								다음
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
