import type { ThemeColor } from "@/shared/model/types";
import { sectionTitle } from "@/shared/styles/snippets";
import { DataCard, Reveal } from "@/shared/ui/display";

interface Props {
	themeColor: ThemeColor;
}

export const SolutionsEdgeComputingLoxilb = ({ themeColor }: Props) => {
	const solutionCardData = [
		{
			title: "Minimal Footprint",
			description: (
				<>
					&lt;50MB memory & &lt;5% CPU usage. <br />
					Fast boot in &lt;5 seconds.
				</>
			),
			icon: "/images/solutions/icon_edge-computing_solution1.svg",
		},
		{
			title: "ARM Native Support",
			description: (
				<>
					Optimized for ARM64 and ARMv7, <br />
					providing 10x better performance <br />
					per watt.
				</>
			),
			icon: "/images/solutions/icon_edge-computing_solution2.svg",
		},
		{
			title: "< 200µs Latency",
			description:
				"Ultra-low P99 latency ensures real-time processing for industrial IoT and video.",
			icon: "/images/solutions/icon_edge-computing_solution3.svg",
		},
		{
			title: "QUIC Protocol",
			description:
				"Native QUIC support for fast, reliable connections even in unstable networks.",
			icon: "/images/solutions/icon_edge-computing_solution4.svg",
		},
	];

	return (
		<div className="mt-[108px]">
			<Reveal>
				<h3 className={sectionTitle}>The LoxiLB Solution</h3>
				<DataCard
					data={solutionCardData}
					colors={themeColor}
					className="lg:grid-cols-4 lg:gap-5"
				/>
			</Reveal>
		</div>
	);
};
