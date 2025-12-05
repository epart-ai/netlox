import { ResourceNewsHead, ResourceNewsPost } from "@/views/resource/news/ui";

type PageProps = {
	searchParams?: { page?: string };
};

export default function ResourceNewsPage({ searchParams }: PageProps) {
	return (
		<>
			<ResourceNewsHead />
			<div className="mt-10 lg:mt-20">
				<ResourceNewsPost searchParams={searchParams} />
			</div>
		</>
	);
}
