import type { ThemeColor } from "@/shared/model/types";
import { Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui";

interface Props {
	themeColor?: ThemeColor;
}

export const TrustSuccessStoryUseCaseHead = ({ themeColor }: Props) => {
	return (
		<Reveal rootMargin="-25% 0px -25% 0px" threshold={0}>
			<PageHead
				eyebrow="Use Cases"
				title="Powering Every Industry"
				description={
					<>
						From cloud-native SaaS to industrial IoT and financial services,
						<br />
						NetLOX provides the reliability and performance modern applications
						demand.
					</>
				}
				theme={themeColor}
			/>
		</Reveal>
	);
};
