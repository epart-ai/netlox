import { useQuery } from "@tanstack/react-query";

import type { PostMeta } from "../../_shared/model/resource.types";
import { fetchBlogList } from "../api/blog.api";

export function usePostsQuery(params: { page?: number; limit?: number }) {
	const { page, limit } = params;
	return useQuery({
		queryKey: ["resource", "blog", "list", { page, limit }],
		queryFn: () => fetchBlogList({ page, limit }),
	});
}

export function usePostMetaQuery() {
	return useQuery({
		queryKey: ["resource", "blog", "meta"],
		queryFn: async (): Promise<PostMeta> => {
			return { usePagination: true, postsPerPage: 6 };
		},
		staleTime: 5 * 60 * 1000,
	});
}
