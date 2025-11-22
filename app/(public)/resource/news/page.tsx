import { ResourceNews } from "@/views/resource/news/ui";

type PageProps = {
	searchParams?: { page?: string };
};

export default function ResourceNewsPage({ searchParams }: PageProps) {
	return <ResourceNews searchParams={searchParams} />;
}
