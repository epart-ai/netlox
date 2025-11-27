import type { ThemeColor } from "@/shared/model/types";
import { sectionTitleLg } from "@/shared/styles/snippets";
import { DataCard, Reveal } from "@/shared/ui/display";

interface Props {
	themeColor: ThemeColor;
}

export const SolutionsAiLlmChallenge = ({ themeColor }: Props) => {
	const challengeCardData = [
		{
			title: "Long-Lived Connections",
			description: (
				<>
					Inference APIs often require connections <br />
					that last minutes or hours, not seconds.
				</>
			),
			image: "/images/solutions/icon_ai-llm_challenge1.svg",
		},
		{
			title: "Critical Session State",
			description: (
				<>
					Session state preservation is essential <br />
					for multi-turn conversations and model context.
				</>
			),
			image: "/images/solutions/icon_ai-llm_challenge2.svg",
		},
		{
			title: "GPU Optimization",
			description: (
				<>
					Inefficient routing leads to underutilized, <br />
					expensive GPU resources and higher costs.
				</>
			),
			image: "/images/solutions/icon_ai-llm_challenge3.svg",
		},
	];

	return (
		<div className="mt-20">
			<Reveal delayMs={300}>
				<h3 className={sectionTitleLg}>The Challenge: AI at Scale</h3>
				<DataCard data={challengeCardData} enableHover={true} colors={themeColor} />
			</Reveal>
		</div>
	);
};
