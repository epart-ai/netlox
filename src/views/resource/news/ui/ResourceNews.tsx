"use client";

import { useMemo } from "react";

import { Spinner } from "@/shared/ui/shadcn/spinner";
import { Pagination } from "@/views/resource/_shared/ui/Pagination";
import { PostCard } from "@/views/resource/_shared/ui/PostCard";
import {
	ResourceEmpty,
	ResourceError,
} from "@/views/resource/_shared/ui/ResourceStates";
import {
	usePostMetaQuery,
	usePostsQuery,
} from "@/views/resource/news/model/news.query";

type ResourceNewsProps = {
	searchParams?: { page?: string };
};

export function ResourceNews({ searchParams }: ResourceNewsProps) {
	const initialPage = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
	const page = initialPage;
	const { data: meta } = usePostMetaQuery();
	const usePagination = meta?.usePagination ?? false;
	const postsPerPage = meta?.postsPerPage ?? 10;

	const queryPage = useMemo(
		() => (usePagination ? page : 1),
		[usePagination, page],
	);

	const { data, isLoading, isError } = usePostsQuery({
		page: queryPage,
		limit: usePagination ? postsPerPage : 30,
	});

	if (isLoading) return <Spinner size="lg" />;
	if (isError || !data) return <ResourceError />;

	const { posts, total } = data;
	const totalPages = usePagination ? Math.ceil(total / postsPerPage) : 1;
	const currentPage = queryPage;

	return (
		<>
			{posts.length === 0 ? (
				<ResourceEmpty />
			) : (
				<>
					<ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
						{posts.map((post) => (
							<PostCard
								key={post.id}
								id={post.id}
								title={post.title}
								createdAt={post.created_at}
								imageUrl={post.imageUrl}
								href={post.etc1 ?? undefined}
							/>
						))}
					</ul>

					{usePagination && (
						<Pagination currentPage={currentPage} totalPages={totalPages} />
					)}
				</>
			)}
		</>
	);
}
