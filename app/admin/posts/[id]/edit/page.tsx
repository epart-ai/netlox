'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { attachmentsService } from '@/shared/board/attachments'
import { boardService } from '@/shared/board/board'
import { boardsService } from '@/shared/board/boards'
import type { Attachment, Board } from '@/shared/board/types/board'
import { createClient } from '@/shared/supabase/client'

export const dynamic = 'force-dynamic'

type FormState = {
	boardSlug: string
	title: string
	content: string
}

export default function AdminPostEditPage() {
	const params = useParams()
	const postId = params.id as string
	const router = useRouter()

	const [boards, setBoards] = useState<Board[]>([])
	const [form, setForm] = useState<FormState>({ boardSlug: '', title: '', content: '' })
	const [existingAttachments, setExistingAttachments] = useState<Attachment[]>([])
	const [files, setFiles] = useState<File[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const authHeader = useCallback(async (): Promise<Record<string, string>> => {
		const supabase = createClient()
		const {
			data: { session },
		} = await supabase.auth.getSession()
		return session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}
	}, [])

	const loadData = useCallback(async () => {
		try {
			const [boardsList, post, attachments] = await Promise.all([
				boardsService.listAll(),
				boardService.getPost(postId),
				attachmentsService.listByPost(postId),
			])

			setBoards(boardsList)

			if (!post) {
				setError('게시글을 찾을 수 없습니다.')
				return
			}

			setForm({
				boardSlug: post.board_slug,
				title: post.title,
				content: post.content,
			})

			setExistingAttachments(attachments)
		} catch (err) {
			const message = err instanceof Error ? err.message : '데이터를 불러오지 못했습니다.'
			setError(message)
		}
	}, [postId])

	useEffect(() => {
		loadData()
	}, [loadData])

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!form.title.trim() || !form.content.trim() || !form.boardSlug) {
			setError('필수 항목을 입력하세요.')
			return
		}

		try {
			setLoading(true)
			setError('')

			const headers = {
				'Content-Type': 'application/json',
				...(await authHeader()),
			}

			const response = await fetch(`/api/admin/posts/${postId}`, {
				method: 'PATCH',
				headers,
				body: JSON.stringify({
					title: form.title.trim(),
					content: form.content.trim(),
					board_slug: form.boardSlug,
				}),
			})
			const result = await response.json()
			if (!response.ok) throw new Error(result.error || '수정 실패')

			if (files.length > 0) {
				const supabase = createClient()
				const uploads: Array<{
					file_url: string
					file_name?: string
					file_size?: number
					mime_type?: string
				}> = []

				for (const file of files) {
					const path = `${postId}/${Date.now()}_${encodeURIComponent(file.name)}`
					const { error: uploadError } = await supabase.storage.from('attachments').upload(path, file, {
						cacheControl: '3600',
						upsert: false,
						contentType: file.type || undefined,
					})
					if (uploadError) throw new Error(`파일 업로드 실패 (${file.name}): ${uploadError.message}`)
					const { data } = supabase.storage.from('attachments').getPublicUrl(path)
					uploads.push({
						file_url: data.publicUrl,
						file_name: file.name,
						file_size: file.size,
						mime_type: file.type || undefined,
					})
				}

				const attachmentResponse = await fetch('/api/admin/attachments', {
					method: 'POST',
					headers,
					body: JSON.stringify({ postId, files: uploads }),
				})
				const attachmentResult = await attachmentResponse.json()
				if (!attachmentResponse.ok) throw new Error(attachmentResult.error || '첨부 파일 저장 실패')
			}

			router.push('/admin/posts')
		} catch (err) {
			const message = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
			setError(message)
		} finally {
			setLoading(false)
		}
	}

	const deleteAttachment = useCallback(
		async (attachmentId: string) => {
			if (!confirm('첨부파일을 삭제하시겠습니까?')) return
			try {
				const headers = await authHeader()
				const response = await fetch(`/api/admin/attachments/${attachmentId}`, {
					method: 'DELETE',
					headers,
				})
				const result = await response.json()
				if (!response.ok) throw new Error(result.error || '삭제 실패')
				const list = await attachmentsService.listByPost(postId)
				setExistingAttachments(list)
			} catch (err) {
				const message = err instanceof Error ? err.message : '삭제에 실패했습니다.'
				alert(message)
			}
		},
		[authHeader, postId],
	)

	const replaceAttachment = useCallback(
		async (attachmentId: string, file: File) => {
			try {
				const supabase = createClient()
				const path = `${postId}/${Date.now()}_${encodeURIComponent(file.name)}`
				const { error: uploadError } = await supabase.storage.from('attachments').upload(path, file, {
					cacheControl: '3600',
					upsert: false,
					contentType: file.type || undefined,
				})
				if (uploadError) throw new Error('파일 업로드에 실패했습니다.')

				const { data } = supabase.storage.from('attachments').getPublicUrl(path)
				const headers = {
					'Content-Type': 'application/json',
					...(await authHeader()),
				}

				const response = await fetch('/api/admin/attachments', {
					method: 'POST',
					headers,
					body: JSON.stringify({
						postId,
						files: [
							{
								file_url: data.publicUrl,
								file_name: file.name,
								file_size: file.size,
								mime_type: file.type || undefined,
							},
						],
					}),
				})
				const result = await response.json()
				if (!response.ok) throw new Error(result.error || '첨부 파일 저장 실패')

				await deleteAttachment(attachmentId)
			} catch (err) {
				const message = err instanceof Error ? err.message : '첨부 파일 교체에 실패했습니다.'
				alert(message)
			}
		},
		[authHeader, deleteAttachment, postId],
	)

	const boardOptions = useMemo(
		() =>
			boards.map((item) => (
				<option key={item.slug} value={item.slug}>
					{item.name}
				</option>
			)),
		[boards],
	)

	const selectedBoard = boards.find((item) => item.slug === form.boardSlug)
	const maxAttachments = selectedBoard?.max_attachments ?? 5
	const remainAttachments = Math.max(0, maxAttachments - existingAttachments.length)

	return (
		<div className="max-w-5xl mx-auto px-6 py-8">
			<div className="bg-slate-900 shadow rounded-lg border border-slate-800 p-6">
				<h1 className="text-2xl font-bold text-white mb-6">게시글 수정</h1>
				{error && <p className="mb-4 text-sm text-red-400">{error}</p>}
				<form onSubmit={handleSubmit} className="space-y-5">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm text-slate-300 mb-2">보드</label>
							<select
								value={form.boardSlug}
								onChange={(event) => setForm((prev) => ({ ...prev, boardSlug: event.target.value }))}
								className="w-full bg-slate-800 text-slate-100 border border-slate-700 rounded px-3 py-2"
							>
								{boardOptions}
							</select>
						</div>
					</div>
					<div>
						<label className="block text-sm text-slate-300 mb-2">
							첨부파일 (최대 {maxAttachments}개, 추가 가능 {remainAttachments}개)
						</label>
						<input
							type="file"
							multiple
							onChange={(event) => {
								const selectedFiles = Array.from(event.target.files ?? [])
								setFiles(selectedFiles.slice(0, remainAttachments))
							}}
							className="block w-full text-sm text-slate-200"
						/>
						{files.length > 0 && (
							<ul className="mt-2 text-sm text-slate-400 list-disc pl-5">
								{files.map((file) => (
									<li key={file.name}>{file.name}</li>
								))}
							</ul>
						)}
					</div>
					<div>
						<label className="block text-sm text-slate-300 mb-2">제목</label>
						<input
							value={form.title}
							onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
							className="w-full bg-slate-800 text-slate-100 border border-slate-700 rounded px-3 py-2"
							placeholder="제목"
						/>
					</div>
					<div>
						<label className="block text-sm text-slate-300 mb-2">내용</label>
						<textarea
							value={form.content}
							onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
							rows={12}
							className="w-full bg-slate-800 text-slate-100 border border-slate-700 rounded px-3 py-2"
							placeholder="내용"
						/>
					</div>

					{existingAttachments.length > 0 && (
						<div>
							<h2 className="text-sm font-semibold text-slate-300 mb-2">기존 첨부</h2>
							<ul className="divide-y divide-slate-800">
								{existingAttachments.map((attachment) => (
									<li key={attachment.id} className="py-2 flex items-center justify-between">
										<a
											href={attachment.file_url}
											target="_blank"
											rel="noreferrer"
											className="text-blue-400 hover:text-blue-300 hover:underline text-sm truncate mr-4"
										>
											{attachment.file_name || attachment.file_url}
										</a>
										<div className="flex items-center gap-3">
											<label className="text-sm text-slate-300 cursor-pointer">
												교체
												<input
													type="file"
													className="hidden"
													onChange={(event) => {
														const file = event.target.files?.[0]
														if (file) replaceAttachment(attachment.id, file)
													}}
												/>
											</label>
											<button
												type="button"
												onClick={() => deleteAttachment(attachment.id)}
												className="text-red-400 hover:text-red-300 text-sm"
											>
												삭제
											</button>
										</div>
									</li>
								))}
							</ul>
						</div>
					)}

					<div className="flex justify-end gap-3">
						<button
							type="button"
							onClick={() => router.back()}
							className="px-4 py-2 border border-slate-700 text-slate-200 rounded"
						>
							취소
						</button>
						<button
							type="submit"
							disabled={
								loading ||
								files.length > Math.max(0, maxAttachments - existingAttachments.length)
							}
							className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
						>
							{loading ? '수정 중...' : '수정하기'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

