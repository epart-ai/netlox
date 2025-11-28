"use client";

import { useMemo } from "react";

import { cardListGrid } from "@/shared/styles/snippets";
import { Reveal } from "@/shared/ui/display";
import { CardList } from "@/shared/ui/shadcn/card";
import { Spinner } from "@/shared/ui/shadcn/spinner";
import { PostCard } from "@/views/_shared/ui";
import { Pagination } from "@/views/resource/_shared/ui/Pagination";
import {
	ResourceEmpty,
	ResourceError,
} from "@/views/resource/_shared/ui/ResourceStates";
import {
	usePostMetaQuery,
	usePostsQuery,
} from "@/views/resource/news/model/news.query";

interface Props {
	searchParams?: { page?: string };
}

export function ResourceNewsPost({ searchParams }: Props) {
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
		<Reveal rootMargin="-10% 0px -10% 0px" threshold={0}>
			{posts.length === 0 ? (
				<ResourceEmpty />
			) : (
				<>
					<CardList colors="blue" className={cardListGrid}>
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
					</CardList>

					{usePagination && (
						<Pagination currentPage={currentPage} totalPages={totalPages} />
					)}
				</>
			)}
		</Reveal>
	);
}
