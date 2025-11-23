"use client";

import { DataCard, Reveal } from "@/shared/ui/display";

import { RootSectionLayout } from "./RootSectionLayout";

export const RootModel = () => {
	const data = [
		{
			title: "AWS SaaS Marketplace",
			description:
				"Fully managed, auto-scaling, and 5-minute setup. Integrates directly with your AWS billing.",
			image: "/images/main/icon_model1.svg",
			link: { label: "Launch on AWS", url: "" },
		},
		{
			title: "Kubernetes In-Cluster",
			description:
				"Pod-based deployment using Helm charts. GitOps ready and fully compatible with any CNI.",
			image: "/images/main/icon_model2.svg",
			link: { label: "Deploy to K8s", url: "" },
		},
		{
			title: "On-Premise Software",
			description:
				"Install on bare metal or VMs for air-gapped environments or custom hardware configurations.",
			image: "/images/main/icon_model3.svg",
			link: { label: "Download Software", url: "" },
		},
	];
	return (
		<RootSectionLayout
			eyebrow="Maximum Flexibility"
			title="Choose Your Deployment Model"
			description="Deploy NetLOX anywhere, from on-premise bare metal and Kubernetes clusters to a fully managed SaaS on AWS."
			className="bg-gradient-to-b from-blue-100/15 to-blue-40/15"
		>
			<Reveal delayMs={300}>
				<DataCard data={data} colors="blue" />
			</Reveal>
		</RootSectionLayout>
	);
};
