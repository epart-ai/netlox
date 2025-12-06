import { gradientBackgroundBlack } from "@/shared/styles/snippets";
import { DataCard, Reveal } from "@/shared/ui/display";

import { RootSectionLayout } from "./RootSectionLayout";

export const RootModel = () => {
	const data = [
		{
			title: "AWS SaaS Marketplace",
			description:
				"Fully managed, auto-scaling, and 5-minute setup. Integrates directly with your AWS billing.",
			icon: "/images/main/icon_model1.svg",
			link: {
				label: "Launch on AWS",
				href: 'javascript:alert("The AWS Marketplace service is currently under preparation. It is scheduled for official launch in the first quarter of 2026. We will be launching soon!")',
			},
		},
		{
			title: "Kubernetes In-Cluster",
			description:
				"Pod-based deployment using Helm charts. GitOps ready and fully compatible with any CNI.",
			icon: "/images/main/icon_model2.svg",
			disabledIconInvert: true,
			link: {
				label: "Deploy to K8s",
				href: "https://docs.loxilb.io/latest/k8s-flannel-incluster/",
				target: "_blank",
			},
		},
		{
			title: "On-Premise Software",
			description:
				"Install on bare metal or VMs for air-gapped environments or custom hardware configurations.",
			icon: "/images/main/icon_model3.svg",
			disabledIconInvert: true,
			link: {
				label: "Download Software",
				href: "https://docs.loxilb.io/latest/standalone/",
				target: "_blank",
			},
		},
	];
	return (
		<RootSectionLayout
			eyebrow="Maximum Flexibility"
			title="Choose Your Deployment Model"
			description="Deploy NetLOX anywhere, from on-premise bare metal and Kubernetes clusters to a fully managed SaaS on AWS."
			className={gradientBackgroundBlack}
		>
			<Reveal>
				<DataCard data={data} colors="blue" />
			</Reveal>
		</RootSectionLayout>
	);
};
