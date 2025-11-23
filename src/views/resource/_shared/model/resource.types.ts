export type PostMeta = {
	usePagination: boolean;
	postsPerPage: number;
};

export type Post = {
	id: string;
	title: string;
	created_at: string;
	etc1: string | null;
	imageUrl: string | null;
};

export type PostListResponse = {
	posts: Post[];
	total: number;
	meta: PostMeta;
};
