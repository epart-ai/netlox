"use client";

import { useCallback, useEffect, useState } from "react";

import { boardsService } from "@/shared/board/boards";
import type { Board } from "@/shared/board/types/board";

export const dynamic = "force-dynamic";

export default function AdminBoardsPage() {
	const [boards, setBoards] = useState<Board[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const [slug, setSlug] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [isActive, setIsActive] = useState(true);
	const [maxAttachments, setMaxAttachments] = useState<number>(5);
	const [usePagination, setUsePagination] = useState(false);
	const [postsPerPage, setPostsPerPage] = useState<number>(10);

	const load = useCallback(async () => {
		try {
			setLoading(true);
			const list = await boardsService.listAll();
			setBoards(list);
		} catch (err) {
			setError(err instanceof Error ? err.message : "불러오기 실패");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!slug.trim() || !name.trim()) return;
		try {
			await boardsService.create({
				slug: slug.trim(),
				name: name.trim(),
				description: description.trim() || null,
				is_active: isActive,
				max_attachments: maxAttachments,
				use_pagination: usePagination,
				posts_per_page: postsPerPage,
			});
			setSlug("");
			setName("");
			setDescription("");
			setIsActive(true);
			setMaxAttachments(5);
			setUsePagination(false);
			setPostsPerPage(10);
			await load();
		} catch (err) {
			alert(err instanceof Error ? err.message : "생성 실패");
		}
	};

	const handleToggleActive = async (board: Board) => {
		try {
			await boardsService.update(board.slug, { is_active: !board.is_active });
			await load();
		} catch (err) {
			alert(err instanceof Error ? err.message : "변경 실패");
		}
	};

	const handleDelete = async (board: Board) => {
		if (
			!confirm("삭제하시겠습니까? 이 보드의 게시글은 기본값 보드로 이동됩니다.")
		)
			return;
		try {
			await boardsService.remove(board.slug);
			await load();
		} catch (err) {
			alert(err instanceof Error ? err.message : "삭제 실패");
		}
	};

	return (
		<div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
			<div className="rounded-lg border border-slate-800 bg-slate-900 shadow">
				<div className="border-b border-slate-800 px-6 py-4">
					<h1 className="text-2xl font-bold text-white">관리자 - 보드 관리</h1>
				</div>

				<div className="p-6">
					<div className="mb-6 rounded-lg border border-slate-800 bg-slate-800/30 p-4">
						<h2 className="mb-4 text-lg font-semibold text-white">
							새 보드 추가
						</h2>
						<form onSubmit={handleCreate} className="space-y-4">
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
								<div>
									<label
										htmlFor="board-slug"
										className="mb-1 block text-sm text-slate-300"
									>
										Slug *
									</label>
									<input
										id="board-slug"
										value={slug}
										onChange={(e) => setSlug(e.target.value)}
										placeholder="예: notice"
										required
										className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500"
									/>
								</div>
								<div>
									<label
										htmlFor="board-name"
										className="mb-1 block text-sm text-slate-300"
									>
										이름 *
									</label>
									<input
										id="board-name"
										value={name}
										onChange={(e) => setName(e.target.value)}
										placeholder="보드 이름"
										required
										className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500"
									/>
								</div>
								<div>
									<label
										htmlFor="board-description"
										className="mb-1 block text-sm text-slate-300"
									>
										설명
									</label>
									<input
										id="board-description"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										placeholder="보드 설명 (선택사항)"
										className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500"
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
								<div>
									<label
										htmlFor="board-max-attachments"
										className="mb-1 block text-sm text-slate-300"
									>
										최대 첨부파일 수
									</label>
									<input
										id="board-max-attachments"
										type="number"
										min={0}
										value={maxAttachments}
										onChange={(e) =>
											setMaxAttachments(parseInt(e.target.value || "0", 10))
										}
										className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100"
									/>
								</div>
								<div>
									<label
										htmlFor="board-posts-per-page"
										className="mb-1 block text-sm text-slate-300"
									>
										페이지당 게시물 수
									</label>
									<input
										id="board-posts-per-page"
										type="number"
										min={1}
										value={postsPerPage}
										onChange={(e) =>
											setPostsPerPage(parseInt(e.target.value || "6", 6))
										}
										className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100"
									/>
								</div>
								<div className="flex items-end">
									<label className="flex items-center gap-2 text-sm text-slate-300">
										<input
											type="checkbox"
											checked={usePagination}
											onChange={(e) => setUsePagination(e.target.checked)}
											className="rounded border-slate-700 bg-slate-800"
										/>
										페이징 사용
									</label>
								</div>
								<div className="flex items-end">
									<label className="flex items-center gap-2 text-sm text-slate-300">
										<input
											type="checkbox"
											checked={isActive}
											onChange={(e) => setIsActive(e.target.checked)}
											className="rounded border-slate-700 bg-slate-800"
										/>
										활성화
									</label>
								</div>
							</div>

							<div className="flex justify-end">
								<button
									type="submit"
									className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
								>
									보드 추가
								</button>
							</div>
						</form>
					</div>

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
											Slug
										</th>
										<th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-200">
											이름
										</th>
										<th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-200">
											설명
										</th>
										<th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-200">
											최대 첨부
										</th>
										<th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-200">
											페이징
										</th>
										<th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-200">
											페이지당
										</th>
										<th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-200">
											상태
										</th>
										<th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-200">
											관리
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-slate-800">
									{boards.map((b) => (
										<tr key={b.slug} className="hover:bg-slate-800/40">
											<td className="px-4 py-2 text-sm text-slate-200">
												{b.slug}
											</td>
											<td className="px-4 py-2 text-sm text-slate-200">
												{b.name}
											</td>
											<td className="px-4 py-2 text-sm text-slate-300">
												{b.description || "-"}
											</td>
											<td className="px-4 py-2 text-sm">
												<input
													type="number"
													min={0}
													value={b.max_attachments}
													onChange={async (e) => {
														const v = parseInt(e.target.value || "0", 10);
														try {
															await boardsService.update(b.slug, {
																max_attachments: v,
															});
															await load();
														} catch {}
													}}
													className="w-24 rounded border border-slate-700 bg-slate-800 px-2 py-1 text-slate-100"
												/>
											</td>
											<td className="px-4 py-2 text-sm">
												<input
													type="checkbox"
													checked={b.use_pagination ?? false}
													onChange={async (e) => {
														try {
															await boardsService.update(b.slug, {
																use_pagination: e.target.checked,
															});
															await load();
														} catch {}
													}}
													className="rounded border border-slate-700 bg-slate-800 text-slate-100"
												/>
											</td>
											<td className="px-4 py-2 text-sm">
												<input
													type="number"
													min={1}
													value={b.posts_per_page ?? 10}
													onChange={async (e) => {
														const v = parseInt(e.target.value || "10", 10);
														try {
															await boardsService.update(b.slug, {
																posts_per_page: v,
															});
															await load();
														} catch {}
													}}
													className="w-24 rounded border border-slate-700 bg-slate-800 px-2 py-1 text-slate-100"
												/>
											</td>
											<td className="px-4 py-2 text-sm text-slate-200">
												{b.is_active ? "활성" : "비활성"}
											</td>
											<td className="px-4 py-2 text-sm">
												<div className="flex gap-3">
													<button
														type="button"
														onClick={() => handleToggleActive(b)}
														className="text-blue-400 hover:text-blue-300 hover:underline"
													>
														{b.is_active ? "비활성" : "활성"}
													</button>
													<button
														type="button"
														onClick={() => handleDelete(b)}
														className="text-red-400 hover:text-red-300 hover:underline"
													>
														삭제
													</button>
												</div>
											</td>
										</tr>
									))}
									{boards.length === 0 && (
										<tr>
											<td
												colSpan={8}
												className="px-4 py-10 text-center text-slate-400"
											>
												보드가 없습니다.
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
