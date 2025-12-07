import type { ThemeColor } from "@/shared/model/types";
import { sectionTitle } from "@/shared/styles/snippets";
import { DataCard, Reveal } from "@/shared/ui/display";

interface Props {
	themeColor?: ThemeColor;
}

export const SolutionsKubernetesLoxilb = ({ themeColor }: Props) => {
	const solutionCardData = [
		{
			title: "Zero-Downtime Migration",
			description:
				"Seamlessly migrate from MetalLB with zero downtime. LoxiLB integrates with any CNI.",
			icon: "/images/solutions/icon_kubernetes_solution1.svg",
		},
		{
			title: "BGP & Gateway API",
			description:
				"Full support for BGP with goBGP, plus compliance with ServiceType=LoadBalancer and Gateway API.",
			icon: "/images/solutions/icon_kubernetes_solution2.svg",
		},
		{
			title: "Multi-Cluster Balancing",
			description:
				"Manage traffic across multiple Kubernetes clusters from a single, high-performance control plane.",
			icon: "/images/solutions/icon_kubernetes_solution3.svg",
		},
	];

	return (
		<div className="mt-15 lg:mt-[108px]">
			<Reveal>
				<h3 className={sectionTitle}>The LoxiLB Solution</h3>
				<DataCard data={solutionCardData} colors={themeColor} />
			</Reveal>
		</div>
	);
};
