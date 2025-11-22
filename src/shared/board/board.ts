import type {
	CreatePostData,
	Post,
	UpdatePostData,
} from "@/shared/board/types/board";
import { createClient } from "@/shared/supabase/client";

const supabase = createClient();

export const boardService = {
	// 게시글 목록 조회 (보드/타입 필터 지원)
	async getPosts(
		page = 1,
		limit = 10,
		options?: { boardSlug?: string },
	): Promise<{ posts: Post[]; total: number }> {
		const from = (page - 1) * limit;
		const to = from + limit - 1;

		let query = supabase
			.from("posts")
			.select(
				`
        id,
        title,
        content,
        author_id,
        author_name,
        board_slug,
        created_at,
        updated_at,
        views,
        etc1,
        etc2,
        etc3,
        etc4,
        etc5
      `,
				{ count: "exact" },
			)
			.order("created_at", { ascending: false });

		if (options?.boardSlug) {
			query = query.eq("board_slug", options.boardSlug);
		}
		const { data: posts, error, count } = await query.range(from, to);

		if (error) {
			throw new Error(`게시글 목록 조회 실패: ${error.message}`);
		}

		return {
			posts: posts || [],
			total: count || 0,
		};
	},

	// 게시글 상세 조회
	async getPost(id: string): Promise<Post | null> {
		const { data, error } = await supabase
			.from("posts")
			.select("*")
			.eq("id", id)
			.single();

		if (error) {
			throw new Error(`게시글 조회 실패: ${error.message}`);
		}

		return data;
	},

	// 게시글 생성
	async createPost(postData: CreatePostData): Promise<Post> {
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			throw new Error("로그인이 필요합니다.");
		}

		const { data, error } = await supabase
			.from("posts")
			.insert({
				...postData,
				author_id: user.id,
				author_name: user.email?.split("@")[0] || "익명",
				views: 0,
			})
			.select()
			.single();

		if (error) {
			throw new Error(`게시글 생성 실패: ${error.message}`);
		}

		return data;
	},

	// 게시글 수정
	async updatePost(id: string, postData: UpdatePostData): Promise<Post> {
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			throw new Error("로그인이 필요합니다.");
		}

		const { data, error } = await supabase
			.from("posts")
			.update({
				...postData,
				updated_at: new Date().toISOString(),
			})
			.eq("id", id)
			.eq("author_id", user.id) // 작성자만 수정 가능
			.select()
			.single();

		if (error) {
			throw new Error(`게시글 수정 실패: ${error.message}`);
		}

		return data;
	},

	// 게시글 삭제
	async deletePost(id: string): Promise<void> {
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			throw new Error("로그인이 필요합니다.");
		}

		const { error } = await supabase
			.from("posts")
			.delete()
			.eq("id", id)
			.eq("author_id", user.id); // 작성자만 삭제 가능

		if (error) {
			throw new Error(`게시글 삭제 실패: ${error.message}`);
		}
	},

	// 조회수 증가
	async incrementViews(id: string): Promise<void> {
		const { error } = await supabase.rpc("increment_views", { post_id: id });

		if (error) {
			console.error("조회수 증가 실패:", error.message);
		}
	},
};
