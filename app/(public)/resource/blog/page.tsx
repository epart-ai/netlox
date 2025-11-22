import { ResourceBlog } from "@/views/resource/blog/ui";

type PageProps = {
	searchParams?: { page?: string };
};

export default function BusinessPricingPage({ searchParams }: PageProps) {
	return <ResourceBlog searchParams={searchParams} />;
}
