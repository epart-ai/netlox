"use client";

import { useMemo } from "react";

import { Pagination } from "@/views/resource/_shared/ui/Pagination";
import { PostCard } from "@/views/resource/_shared/ui/PostCard";
import {
	ResourceEmpty,
	ResourceError,
	ResourceLoading,
} from "@/views/resource/_shared/ui/ResourceStates";
import {
	usePostMetaQuery,
	usePostsQuery,
} from "@/views/resource/news/model/news.query";
import { PageHead } from "@/views/_shared/ui/PageHead";

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

	if (isLoading) return <ResourceLoading title="News" />;

	if (isError || !data) return <ResourceError title="News" />;

	const { posts, total } = data;
	const totalPages = usePagination ? Math.ceil(total / postsPerPage) : 1;
	const currentPage = queryPage;

	return (
		<div className="">
			<PageHead
				eyebrow="News"
				title="Official Press Releases & Updates"
				description={
					<>
						Read the latest official company announcements, press releases,
						partnerships, and industry recognition.
					</>
				}
				align="center"
				theme="blue"
			/>
			<div className="mt-20">
				{posts.length === 0 ? (
					<ResourceEmpty title="News" />
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
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								basePath="/resource/news"
							/>
						)}
					</>
				)}
			</div>
		</div>
	);
}
