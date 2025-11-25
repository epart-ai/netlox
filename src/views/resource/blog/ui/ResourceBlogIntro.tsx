"use client";

import { Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui";

export function ResourceBlogIntro() {
	return (
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
	);
}
