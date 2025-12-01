import Link from "next/link";

import { ROUTES } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import { beforeBackgroundImage } from "@/shared/styles/snippets";
import { DataCard, DataList, Reveal } from "@/shared/ui/display";
import { Button, ButtonBox } from "@/shared/ui/shadcn/button";

import { RootSectionLayout } from "./RootSectionLayout";

export const RootFeatures = () => {
	const data = [
		{
			title: "eBPF Data Plane",
			description:
				"Achieve sub-millisecond P99 latency and linear CPU scaling by harnessing the power of eBPF for kernel-level packet processing.",
			icon: "/images/main/icon_feature1.svg",
			footer: <DataList data={["<1ms P99 Latency", "Linear CPU Scaling"]} />,
		},
		{
			title: "Enterprise Reliability",
			description:
				"Built for mission-critical workloads with 99.999% uptime, Multi-AZ high availability, and dedicated 24/7 enterprise support.",
			icon: "/images/main/icon_feature2.svg",
			footer: <DataList data={["99.999% Uptime", "Multi-AZ HA"]} />,
		},
		{
			title: "Specialized Protocols",
			description:
				"Support for complex, modern workloads including 5G/Telco protocols (SCTP, GTP), AI/ML inference, and Edge Computing.",
			icon: "/images/main/icon_feature3.svg",
			footer: <DataList data={["5G/Telco Protocols", "AI/ML Workloads"]} />,
		},
	];
	return (
		<RootSectionLayout
			title="A Complete Load Balancing Platform"
			description="From raw eBPF performance to enterprise-grade reliability and specialized protocols."
			className={cn(
				"before:bg-[url('/images/main/bg_features.jpg')] before:opacity-35 before:mix-blend-normal",
				beforeBackgroundImage,
			)}
		>
			<Reveal>
				<DataCard data={data} colors="blue" />
			</Reveal>
			<Reveal delayMs={450}>
				<ButtonBox className="mt-20">
					<Button asChild>
						<Link href={ROUTES.TECHNOLOGY_FEATURES}>
							<span>Explore All Features</span>
						</Link>
					</Button>
				</ButtonBox>
			</Reveal>
		</RootSectionLayout>
	);
};
