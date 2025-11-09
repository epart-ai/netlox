"use client";

import { DataCard } from "@/shared/ui/display";

import { MainSectionLayout } from "./MainSectionLayout";

export const MainModel = () => {
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
		<MainSectionLayout
			subTitle="Maximum Flexibility"
			title="Choose Your Deployment Model"
			description="Deploy NetLOX anywhere, from on-premise bare metal and Kubernetes clusters to a fully managed SaaS on AWS."
		>
			<DataCard data={data} />
		</MainSectionLayout>
	);
};
