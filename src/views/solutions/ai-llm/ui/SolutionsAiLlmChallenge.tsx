import type { ThemeColor } from "@/shared/model/types";
import { sectionTitle } from "@/shared/styles/snippets";
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
			icon: "/images/solutions/icon_ai-llm_challenge1.svg",
		},
		{
			title: "Critical Session State",
			description: (
				<>
					Session state preservation is essential <br />
					for multi-turn conversations and model context.
				</>
			),
			icon: "/images/solutions/icon_ai-llm_challenge2.svg",
		},
		{
			title: "GPU Optimization",
			description: (
				<>
					Inefficient routing leads to underutilized, <br />
					expensive GPU resources and higher costs.
				</>
			),
			icon: "/images/solutions/icon_ai-llm_challenge3.svg",
		},
	];

	return (
		<div className="mt-10 lg:mt-20">
			<Reveal>
				<h3 className={sectionTitle}>The Challenge: AI at Scale</h3>
				<DataCard data={challengeCardData} colors={themeColor} />
			</Reveal>
		</div>
	);
};
