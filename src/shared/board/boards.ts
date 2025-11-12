import { createClient } from '@/shared/supabase/client'
import type { Board } from '@/shared/board/types/board'

type CreateBoardPayload = {
	slug: string;
	name: string;
	description?: string | null;
	is_active?: boolean;
	max_attachments?: number;
};

export const boardsService = {
	async list(): Promise<Board[]> {
		const supabase = createClient()
		const { data, error } = await supabase
			.from('boards')
			.select('*')
			.eq('is_active', true)
			.order('created_at', { ascending: true })
		if (error) throw new Error(error.message)
		return data || []
	},

	// 관리자용: 활성/비활성 전체 조회
	async listAll(): Promise<Board[]> {
		const supabase = createClient()
		const { data, error } = await supabase
			.from('boards')
			.select('*')
			.order('created_at', { ascending: true })
		if (error) throw new Error(error.message)
		return data || []
	},

	async get(slug: string): Promise<Board | null> {
		const supabase = createClient()
		const { data, error } = await supabase
			.from('boards')
			.select('*')
			.eq('slug', slug)
			.single()
		if (error) throw new Error(error.message)
		return data
	},

	async create(board: CreateBoardPayload): Promise<Board> {
		const supabase = createClient()
		const { data, error } = await supabase
			.from('boards')
			.insert({
				slug: board.slug,
				name: board.name,
				description: board.description ?? null,
				is_active: board.is_active ?? true,
				max_attachments: board.max_attachments ?? 5,
			})
			.select()
			.single()
		if (error) throw new Error(error.message)
		return data
	},

	async update(slug: string, updates: Partial<Omit<Board, 'slug' | 'created_at'>>): Promise<Board> {
		const supabase = createClient()
		const { data, error } = await supabase
			.from('boards')
			.update(updates)
			.eq('slug', slug)
			.select()
			.single()
		if (error) throw new Error(error.message)
		return data
	},

	async remove(slug: string): Promise<void> {
		const supabase = createClient()
		const { error } = await supabase
			.from('boards')
			.delete()
			.eq('slug', slug)
		if (error) throw new Error(error.message)
	}
}


