'use client'

import { useCallback, useEffect, useState } from 'react'

import { boardsService } from '@/shared/board/boards'
import type { Board } from '@/shared/board/types/board'
import { requireAdmin } from '@/shared/admin/admin'

export const dynamic = 'force-dynamic'

export default function AdminBoardsPage() {
  const [boards, setBoards] = useState<Board[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [slug, setSlug] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [maxAttachments, setMaxAttachments] = useState<number>(5)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      const list = await boardsService.listAll()
      setBoards(list)
    } catch (err) {
      setError(err instanceof Error ? err.message : '불러오기 실패')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    (async () => {
      const result = await requireAdmin()
      if (!result.ok) {
        window.location.replace('/admin/login')
        return
      }
      load()
    })()
  }, [load])

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!slug.trim() || !name.trim()) return
    try {
      await boardsService.create({
        slug: slug.trim(),
        name: name.trim(),
        description: description.trim() || null,
        is_active: isActive,
        max_attachments: maxAttachments,
      })
      setSlug('')
      setName('')
      setDescription('')
      setIsActive(true)
      setMaxAttachments(5)
      await load()
    } catch (err) {
      alert(err instanceof Error ? err.message : '생성 실패')
    }
  }

  const handleToggleActive = async (board: Board) => {
    try {
      await boardsService.update(board.slug, { is_active: !board.is_active })
      await load()
    } catch (err) {
      alert(err instanceof Error ? err.message : '변경 실패')
    }
  }

  const handleDelete = async (board: Board) => {
    if (!confirm('삭제하시겠습니까? 이 보드의 게시글은 기본값 보드로 이동됩니다.')) return
    try {
      await boardsService.remove(board.slug)
      await load()
    } catch (err) {
      alert(err instanceof Error ? err.message : '삭제 실패')
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-slate-900 shadow rounded-lg border border-slate-800">
        <div className="px-6 py-4 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-white">관리자 - 보드 관리</h1>
        </div>

        <div className="p-6">
            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="slug (예: notice)" className="bg-slate-800 text-slate-100 placeholder-slate-500 border border-slate-700 px-3 py-2 rounded" />
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" className="bg-slate-800 text-slate-100 placeholder-slate-500 border border-slate-700 px-3 py-2 rounded" />
              <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="설명 (선택)" className="bg-slate-800 text-slate-100 placeholder-slate-500 border border-slate-700 px-3 py-2 rounded" />
              <input type="number" min={0} value={maxAttachments} onChange={(e) => setMaxAttachments(parseInt(e.target.value || '0', 10))} placeholder="최대 첨부(기본 5)" className="bg-slate-800 text-slate-100 placeholder-slate-500 border border-slate-700 px-3 py-2 rounded" />
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-slate-200"><input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />활성</label>
                <button type="submit" className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">추가</button>
              </div>
            </form>

            {loading ? (
              <p className="text-slate-300">불러오는 중...</p>
            ) : error ? (
              <p className="text-red-400">{error}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-800">
                  <thead className="bg-slate-800/60">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-slate-200 uppercase">Slug</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-slate-2 00 uppercase">이름</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-slate-200 uppercase">설명</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-slate-200 uppercase">최대 첨부</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-slate-200 uppercase">상태</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-slate-200 uppercase">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {boards.map((b) => (
                      <tr key={b.slug} className="hover:bg-slate-800/40">
                        <td className="px-4 py-2 text-sm text-slate-200">{b.slug}</td>
                        <td className="px-4 py-2 text-sm text-slate-200">{b.name}</td>
                        <td className="px-4 py-2 text-sm text-slate-300">{b.description || '-'}</td>
                        <td className="px-4 py-2 text-sm">
                          <input
                            type="number"
                            min={0}
                            value={b.max_attachments}
                            onChange={async (e) => {
                              const v = parseInt(e.target.value || '0', 10)
                              try { await boardsService.update(b.slug, { max_attachments: v }); await load() } catch {}
                            }}
                            className="w-24 bg-slate-800 text-slate-100 border border-slate-700 px-2 py-1 rounded"
                          />
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-200">{b.is_active ? '활성' : '비활성'}</td>
                        <td className="px-4 py-2 text-sm">
                          <div className="flex gap-3">
                            <button type="button" onClick={() => handleToggleActive(b)} className="text-blue-400 hover:text-blue-300 hover:underline">{b.is_active ? '비활성' : '활성'}</button>
                            <button type="button" onClick={() => handleDelete(b)} className="text-red-400 hover:text-red-300 hover:underline">삭제</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {boards.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-10 text-center text-slate-400">보드가 없습니다.</td>
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


