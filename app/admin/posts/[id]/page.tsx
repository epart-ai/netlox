"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { attachmentsService } from "@/shared/board/attachments";
import { boardService } from "@/shared/board/board";
import type { Attachment, Post } from "@/shared/board/types/board";

export const dynamic = "force-dynamic";

export default function AdminPostDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const postId = params.id;
	const [post, setPost] = useState<Post | null>(null);
	const [attachments, setAttachments] = useState<Attachment[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const loadPost = useCallback(async () => {
		try {
			setLoading(true);
			setError("");
			const fetchedPost = await boardService.getPost(postId);
			if (!fetchedPost) {
				setError("게시글을 찾을 수 없습니다.");
				setPost(null);
				setAttachments([]);
				return;
			}
			setPost(fetchedPost);
			const files = await attachmentsService.listByPost(postId);
			setAttachments(files);
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "게시글을 불러오지 못했습니다.";
			setError(message);
		} finally {
			setLoading(false);
		}
	}, [postId]);

	useEffect(() => {
		loadPost();
	}, [loadPost]);

	const contentLines =
		post?.content?.split("\n").map((line, index) => ({
			id: `${postId}-${index}`,
			value: line,
		})) ?? [];

	return (
		<div className="mx-auto w-full max-w-5xl px-6 py-8 text-slate-100">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-2xl font-bold text-white">게시글 상세</h1>
				<div className="flex gap-3 text-sm">
					<Link
						href={`/admin/posts/${postId}/edit`}
						className="rounded border border-slate-700 px-4 py-2 text-slate-200 hover:bg-slate-800"
					>
						수정
					</Link>
					<Link
						href={`/post/${postId}`}
						target="_blank"
						rel="noreferrer"
						className="rounded border border-slate-700 px-4 py-2 text-slate-200 hover:bg-slate-800"
					>
						사용자 페이지에서 보기
					</Link>
				</div>
			</div>

			<div className="rounded-lg border border-slate-800 bg-slate-900/70 p-6 shadow">
				{loading ? (
					<p className="text-slate-300">불러오는 중...</p>
				) : error ? (
					<p className="text-red-400">{error}</p>
				) : post ? (
					<div className="space-y-6">
						<div className="space-y-2">
							<p className="text-sm text-slate-400">보드: {post.board_slug}</p>
							<h2 className="text-xl font-semibold text-white">{post.title}</h2>
							<p className="text-sm text-slate-400">
								작성자: {post.author_name} | 작성일:{" "}
								{new Date(post.created_at).toLocaleString("ko-KR")}
								{post.updated_at && (
									<>
										{" "}
										| 수정일:{" "}
										{new Date(post.updated_at).toLocaleString("ko-KR")}
									</>
								)}
							</p>
						</div>

						<div className="space-y-4 rounded border border-slate-800 bg-slate-950/60 p-4">
							<h3 className="text-sm font-semibold text-slate-300">내용</h3>
							{contentLines.length > 0 ? (
								contentLines.map((line) => (
									<p
										key={line.id}
										className="whitespace-pre-wrap text-sm leading-6 text-slate-100"
									>
										{line.value}
									</p>
								))
							) : (
								<p className="text-sm text-slate-400">내용이 없습니다.</p>
							)}
						</div>

						<div className="grid gap-2 text-sm text-slate-300">
							<p>etc1: {post.etc1 ?? "값 없음"}</p>
							<p>etc2: {post.etc2 ?? "값 없음"}</p>
							<p>etc3: {post.etc3 ?? "값 없음"}</p>
							<p>etc4: {post.etc4 ?? "값 없음"}</p>
							<p>etc5: {post.etc5 ?? "값 없음"}</p>
						</div>

						<div>
							<h3 className="text-sm font-semibold text-slate-300">
								첨부 파일
							</h3>
							{attachments.length > 0 ? (
								<ul className="mt-2 space-y-2 text-sm text-blue-400">
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
							) : (
								<p className="mt-2 text-sm text-slate-400">
									첨부 파일이 없습니다.
								</p>
							)}
						</div>
					</div>
				) : (
					<p className="text-slate-300">게시글을 찾을 수 없습니다.</p>
				)}
			</div>
		</div>
	);
}
