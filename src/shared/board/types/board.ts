export interface Post {
	id: string;
	title: string;
	content: string;
	author_id: string;
	author_name: string;
	board_slug: string;
	created_at: string;
	updated_at: string;
	etc1: string | null;
	etc2: string | null;
	etc3: string | null;
	etc4: string | null;
	etc5: string | null;
	views: number;
}

export interface CreatePostData {
	title: string;
	content: string;
	board_slug: string;
	etc1?: string | null;
	etc2?: string | null;
	etc3?: string | null;
	etc4?: string | null;
	etc5?: string | null;
}

export interface UpdatePostData {
	title?: string;
	content?: string;
	board_slug?: string;
	etc1?: string | null;
	etc2?: string | null;
	etc3?: string | null;
	etc4?: string | null;
	etc5?: string | null;
}

export interface Board {
	slug: string;
	name: string;
	description?: string | null;
	is_active: boolean;
	max_attachments: number;
	use_pagination?: boolean;
	posts_per_page?: number;
	created_at: string;
}

export interface Attachment {
	id: string;
	post_id: string;
	file_url: string;
	file_name?: string | null;
	file_size?: number | null;
	mime_type?: string | null;
	created_at: string;
}
