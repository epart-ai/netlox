import { ResourceBlog } from "@/views/resource/_blog/ui";

type PageProps = {
	searchParams?: { page?: string };
};

export default function BusinessPricingPage({ searchParams }: PageProps) {
	return <ResourceBlog searchParams={searchParams} />;
}
