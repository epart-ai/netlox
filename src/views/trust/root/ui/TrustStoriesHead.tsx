import type { ThemeColor } from "@/shared/model/types";
import { Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui";

interface Props {
	themeColor: ThemeColor;
}

export const TrustStoriesHead = ({ themeColor }: Props) => {
	return (
		<Reveal rootMargin="-25% 0px -25% 0px" threshold={0}>
			<PageHead
				eyebrow="Success Stories"
				title="Proven by Global Innovators"
				description="See how leading companies leverage NetLOX to achieve breakthrough performance, reliability, and cost savings."
				theme={themeColor}
			/>
		</Reveal>
	);
};
