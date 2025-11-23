import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/shared/supabase/index.server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const slug = searchParams.get("slug") || "blog";
		const page = parseInt(searchParams.get("page") || "1", 10);
		const limit = parseInt(searchParams.get("limit") || "30", 10);

		const supabase = createSupabaseServerClient();

		// board meta
		const { data: board, error: boardError } = await supabase
			.from("boards")
			.select("*")
			.eq("slug", slug)
			.single();
		if (boardError) {
			throw new Error(boardError.message);
		}

		// posts
		const query = supabase
			.from("posts")
			.select("id, title, created_at, etc1", { count: "exact" })
			.eq("board_slug", slug)
			.order("created_at", { ascending: false });
		const from = (page - 1) * limit;
		const to = from + limit - 1;
		const { data: posts, error, count } = await query.range(from, to);
		if (error) {
			throw new Error(error.message);
		}

		const postIds = (posts || []).map((p) => p.id);
		const { data: attachments, error: attachmentsError } = await supabase
			.from("attachments")
			.select("post_id, file_url")
			.in("post_id", postIds)
			.order("created_at", { ascending: true });
		if (attachmentsError) {
			throw new Error(attachmentsError.message);
		}

		const firstImageMap = new Map<string, string>();
		attachments?.forEach((attachment) => {
			const pid = attachment?.post_id as string | undefined;
			const url = attachment?.file_url as string | null | undefined;
			if (!pid) return;
			if (!firstImageMap.has(pid) && url) {
				firstImageMap.set(pid, url);
			}
		});

		const serializedPosts = (posts || []).map((post) => ({
			id: post.id,
			title: post.title,
			created_at: post.created_at,
			etc1: post.etc1 ?? null,
			imageUrl: firstImageMap.get(post.id) ?? null,
		}));

		return NextResponse.json({
			posts: serializedPosts,
			total: count || 0,
			meta: {
				usePagination: !!board?.use_pagination,
				postsPerPage: Number(board?.posts_per_page || 10),
			},
		});
	} catch (err) {
		const message =
			err instanceof Error
				? err.message
				: "블로그 데이터를 불러오지 못했습니다.";
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
