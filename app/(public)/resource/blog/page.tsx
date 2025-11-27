import { ResourceBlogHead, ResourceBlogPost } from "@/views/resource/blog/ui";

type PageProps = {
	searchParams?: { page?: string };
};

export default function ResourceBlogPage({ searchParams }: PageProps) {
	return (
		<>
			<ResourceBlogHead />
			<div className="mt-20">
				<ResourceBlogPost searchParams={searchParams} />
			</div>
		</>
	);
}
