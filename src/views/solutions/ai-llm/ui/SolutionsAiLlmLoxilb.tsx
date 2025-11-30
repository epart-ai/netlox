import type { ThemeColor } from "@/shared/model/types";
import { sectionTitle } from "@/shared/styles/snippets";
import { DataCard, Reveal } from "@/shared/ui/display";

interface Props {
	themeColor: ThemeColor;
}

export const SolutionsAiLlmLoxilb = ({ themeColor }: Props) => {
	const solutionCardData = [
		{
			title: "QUIC & 5-Tuple Routing",
			description:
				"Intelligently route traffic using QUIC Connection ID or 5-tuple hashing to maintain session affinity.",
			image: "/images/solutions/icon_ai-llm_solution1.svg",
		},
		{
			title: "Source IP Affinity",
			description:
				"Ensure users are consistently routed to the same pod to preserve state and context.",
			image: "/images/solutions/icon_ai-llm_solution2.svg",
		},
		{
			title: "eBPF Optimization",
			description:
				"Achieve lightning-fast, kernel-level packet processing for maximum throughput.",
			image: "/images/solutions/icon_ai-llm_solution3.svg",
		},
	];

	return (
		<div className="mt-[108px]">
			<Reveal>
				<h3 className={sectionTitle}>The LoxiLB Solution</h3>
				<DataCard data={solutionCardData} colors={themeColor} />
			</Reveal>
		</div>
	);
};
