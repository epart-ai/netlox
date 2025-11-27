import type { ThemeColor } from "@/shared/model/types";
import { sectionTitleLg } from "@/shared/styles/snippets";
import { DataCard, Reveal } from "@/shared/ui/display";

interface Props {
	themeColor: ThemeColor;
}

export const SolutionsEdgeComputingChallenge = ({ themeColor }: Props) => {
	const challengeCardData = [
		{
			title: "Resource Constraints",
			description:
				"Edge devices have minimal CPU, memory (<50MB), and power, ruling out traditional LBs.",
			image: "/images/solutions/icon_edge-computing_challenge1.svg",
		},
		{
			title: "Intermittent Connectivity",
			description:
				"Connections can be unstable, requiring local failover capabilities and offline operation support.",
			image: "/images/solutions/icon_edge-computing_challenge2.svg",
		},
		{
			title: "Diverse Hardware",
			description:
				"Must run on various architectures, including ARM (ARM64, ARMv7) and NVIDIA EGX platforms.",
			image: "/images/solutions/icon_edge-computing_challenge3.svg",
		},
	];

	return (
		<div className="mt-20">
			<Reveal delayMs={300}>
				<h3 className={sectionTitleLg}>The Challenge: The Edge</h3>
				<DataCard data={challengeCardData} enableHover={true} colors={themeColor} />
			</Reveal>
		</div>
	);
};
