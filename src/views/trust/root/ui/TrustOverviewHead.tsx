import type { ThemeColor } from "@/shared/model/types";
import { Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui";

interface Props {
	themeColor: ThemeColor;
}

export const TrustOverviewHead = ({ themeColor }: Props) => {
	return (
		<Reveal rootMargin="-25% 0px -25% 0px" threshold={0}>
			<PageHead
				eyebrow="Trust"
				title="Overview"
				description="Trust Stories"
				theme={themeColor}
			/>
		</Reveal>
	);
};
