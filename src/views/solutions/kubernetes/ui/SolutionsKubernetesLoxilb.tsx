"use client";

import type { ThemeColor } from "@/shared/model/types";
import { sectionTitleLg } from "@/shared/styles/snippets";
import { DataCard, Reveal } from "@/shared/ui/display";

interface Props {
	themeColor: ThemeColor;
}

export const SolutionsKubernetesLoxilb = ({ themeColor }: Props) => {
	const solutionCardData = [
		{
			title: "Zero-Downtime Migration",
			description:
				"Seamlessly migrate from MetalLB with zero downtime. LoxiLB integrates with any CNI.",
			image: "/images/solutions/icon_kubernetes_solution1.svg",
		},
		{
			title: "BGP & Gateway API",
			description:
				"Full support for BGP with goBGP, plus compliance with ServiceType=LoadBalancer and Gateway API.",
			image: "/images/solutions/icon_kubernetes_solution2.svg",
		},
		{
			title: "Multi-Cluster Balancing",
			description:
				"Manage traffic across multiple Kubernetes clusters from a single, high-performance control plane.",
			image: "/images/solutions/icon_kubernetes_solution3.svg",
		},
	];

	return (
		<div className="mt-[108px]">
			<Reveal delayMs={300}>
				<h3 className={sectionTitleLg}>The LoxiLB Solution</h3>
				<DataCard data={solutionCardData} colors={themeColor} />
			</Reveal>
		</div>
	);
};
