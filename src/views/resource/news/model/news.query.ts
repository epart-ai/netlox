import { useQuery } from "@tanstack/react-query";

import type { PostMeta } from "../../_shared/model/resource.types";
import { fetchNewsList } from "../api/news.api";

export function usePostsQuery(params: { page?: number; limit?: number }) {
	const { page, limit } = params;
	return useQuery({
		queryKey: ["resource", "news", "list", { page, limit }],
		queryFn: () => fetchNewsList({ page, limit }),
	});
}

export function usePostMetaQuery() {
	return useQuery({
		queryKey: ["resource", "news", "meta"],
		queryFn: async (): Promise<PostMeta> => {
			return { usePagination: true, postsPerPage: 10 };
		},
		staleTime: 5 * 60 * 1000,
	});
}
