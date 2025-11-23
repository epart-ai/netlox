import { Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui";
import { ResourceBlog } from "@/views/resource/blog/ui";

type PageProps = {
	searchParams?: { page?: string };
};

export default function ResourceBlogPage({ searchParams }: PageProps) {
	return (
		<div className="">
			<Reveal rootMargin="-25% 0px -25% 0px" threshold={0}>
				<PageHead
					eyebrow="Blog"
					title="Latest News & Insights"
					description={
						<>
							The latest articles, performance benchmarks, and engineering
							insights from the NetLOX team.
						</>
					}
					align="center"
					theme="blue"
				/>
			</Reveal>
			<Reveal rootMargin="-10% 0px -10% 0px" threshold={0}>
				<div className="mt-20">
					<ResourceBlog searchParams={searchParams} />
				</div>
			</Reveal>
		</div>
	);
}
