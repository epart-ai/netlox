import { Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui";

export function ResourceNewsHead() {
	return (
		<Reveal rootMargin="-25% 0px -25% 0px" threshold={0}>
			<PageHead
				eyebrow="News"
				title="Official Press Releases & Updates"
				description="Read the latest official company announcements, press releases, partnerships, and industry recognition."
				align="center"
			/>
		</Reveal>
	);
}
