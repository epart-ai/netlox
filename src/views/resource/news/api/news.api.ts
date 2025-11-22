import type { PostListResponse } from "../../_shared/model/resource.types";

export async function fetchNewsList(params: {
	page?: number;
	limit?: number;
}): Promise<PostListResponse> {
	const page = params.page ?? 1;
	const limit = params.limit ?? 30;
	const res = await fetch(
		`/api/resource/news?slug=news&page=${page}&limit=${limit}`,
		{
			method: "GET",
			headers: { "Content-Type": "application/json" },
			cache: "no-store",
		},
	);
	if (!res.ok) {
		throw new Error("뉴스 목록을 불러오지 못했습니다.");
	}
	return (await res.json()) as PostListResponse;
}
