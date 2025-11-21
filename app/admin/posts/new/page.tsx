"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { boardsService } from "@/shared/board/boards";
import type { Board } from "@/shared/board/types/board";
import { createClient } from "@/shared/supabase/client";

export const dynamic = "force-dynamic";

export default function AdminPostNewPage() {
	const [boards, setBoards] = useState<Board[]>([]);
	const [board, setBoard] = useState("");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [etc1, setEtc1] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [files, setFiles] = useState<File[]>([]);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const router = useRouter();

	useEffect(() => {
		(async () => {
			const list = await boardsService.listAll();
			setBoards(list);
			if (list.length) setBoard(list[0].slug);
		})();
	}, []);

	const authHeader = async (): Promise<Record<string, string>> => {
		const supabase = createClient();
		const {
			data: { session },
		} = await supabase.auth.getSession();
		return session?.access_token
			? { Authorization: `Bearer ${session.access_token}` }
			: {};
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!title.trim() || !content.trim() || !board) {
			setError("필수 항목을 입력하세요.");
			return;
		}
		try {
			setLoading(true);
			setError("");
			const authHeaders = await authHeader();
			const headers: Record<string, string> = {
				"Content-Type": "application/json",
				...authHeaders,
			};
			const response = await fetch("/api/admin/posts", {
				method: "POST",
				headers,
				body: JSON.stringify({
					title: title.trim(),
					content: content.trim(),
					board_slug: board,
					etc1: etc1.trim() || null,
				}),
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error || "생성 실패");
			if (files.length > 0) {
				const createdId: string | undefined = result.post?.id;
				if (!createdId)
					throw new Error("생성된 게시글 ID를 확인할 수 없습니다.");
				const supabase = createClient();
				const uploads: {
					file_url: string;
					file_name?: string;
					file_size?: number;
					mime_type?: string;
				}[] = [];
				for (const file of files) {
					const path = `${createdId}/${Date.now()}_${encodeURIComponent(file.name)}`;
					const { error: upErr } = await supabase.storage
						.from("attachments")
						.upload(path, file, {
							cacheControl: "3600",
							upsert: false,
							contentType: file.type || undefined,
						});
					if (upErr)
						throw new Error(
							`파일 업로드 실패 (${file.name}): ${upErr.message}`,
						);
					const { data } = supabase.storage
						.from("attachments")
						.getPublicUrl(path);
					uploads.push({
						file_url: data.publicUrl,
						file_name: file.name,
						file_size: file.size,
						mime_type: file.type || undefined,
					});
				}
				const attachmentRes = await fetch("/api/admin/attachments", {
					method: "POST",
					headers,
					body: JSON.stringify({ postId: createdId, files: uploads }),
				});
				const attachmentJson = await attachmentRes.json();
				if (!attachmentRes.ok)
					throw new Error(attachmentJson.error || "첨부 파일 저장 실패");
			}
			router.push("/admin/posts");
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mx-auto max-w-5xl px-6 py-8">
			<div className="rounded-lg border border-slate-800 bg-slate-900 p-6 shadow">
				<h1 className="mb-6 text-2xl font-bold text-white">새 글 작성</h1>
				{error && <p className="mb-4 text-sm text-red-400">{error}</p>}
				<form onSubmit={handleSubmit} className="space-y-5">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<label
								htmlFor="post-board"
								className="mb-2 block text-sm text-slate-300"
							>
								보드
							</label>
							<select
								id="post-board"
								value={board}
								onChange={(e) => setBoard(e.target.value)}
								className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100"
							>
								{boards.map((b) => (
									<option key={b.slug} value={b.slug}>
										{b.name}
									</option>
								))}
							</select>
						</div>
					</div>
					<div>
						<label
							htmlFor="post-files"
							className="mb-2 block text-sm text-slate-300"
						>
							첨부파일{" "}
							{(() => {
								const b = boards.find((x) => x.slug === board);
								return b ? `(최대 ${b.max_attachments}개)` : "";
							})()}
						</label>
						<input
							id="post-files"
							ref={fileInputRef}
							type="file"
							multiple
							onChange={(e) => {
								const selected = Array.from(e.target.files || []);
								const limit =
									boards.find((x) => x.slug === board)?.max_attachments ?? 5;
								setFiles((prev) => {
									const combined = [...prev, ...selected];
									return combined.slice(0, limit);
								});
								if (fileInputRef.current) fileInputRef.current.value = "";
							}}
							className="hidden"
						/>
						<div className="flex items-center gap-3">
							<button
								type="button"
								onClick={() => fileInputRef.current?.click()}
								className="rounded border border-slate-700 px-3 py-2 text-sm text-slate-200"
							>
								파일 추가
							</button>
							<span className="text-sm text-slate-400">
								선택됨: {files.length}개
							</span>
						</div>
						{files.length > 0 && (
							<ul className="mt-2 list-disc pl-5 text-sm text-slate-400">
								{files.map((f, i) => (
									<li key={i} className="flex items-center justify-between">
										<span className="mr-3 truncate">{f.name}</span>
										<button
											type="button"
											className="text-xs text-red-400"
											onClick={() =>
												setFiles((prev) => prev.filter((_, idx) => idx !== i))
											}
										>
											제거
										</button>
									</li>
								))}
							</ul>
						)}
					</div>
					<div>
						<label
							htmlFor="post-title"
							className="mb-2 block text-sm text-slate-300"
						>
							제목
						</label>
						<input
							id="post-title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100"
							placeholder="제목"
						/>
					</div>
					<div>
						<label
							htmlFor="post-content"
							className="mb-2 block text-sm text-slate-300"
						>
							내용
						</label>
						<textarea
							id="post-content"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							rows={12}
							className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100"
							placeholder="내용"
						/>
					</div>
					<div>
						<label
							htmlFor="post-link"
							className="mb-2 block text-sm text-slate-300"
						>
							링크 (선택사항)
						</label>
						<input
							id="post-link"
							type="url"
							value={etc1}
							onChange={(e) => setEtc1(e.target.value)}
							className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100"
							placeholder="https://example.com"
						/>
						<p className="mt-1 text-xs text-slate-400">
							게시글에 연결할 링크를 입력하세요.
						</p>
					</div>
					<div className="flex justify-end gap-3">
						<button
							type="button"
							onClick={() => router.back()}
							className="rounded border border-slate-700 px-4 py-2 text-slate-200"
						>
							취소
						</button>
						<button
							type="submit"
							disabled={
								loading ||
								files.length >
									(boards.find((x) => x.slug === board)?.max_attachments ?? 5)
							}
							className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
						>
							{loading ? "작성 중..." : "작성하기"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
