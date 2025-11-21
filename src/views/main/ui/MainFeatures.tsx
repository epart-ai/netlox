import { BackgroundImage, DataCard, DataList } from "@/shared/ui/display";
import { Button, ButtonBox } from "@/shared/ui/shadcn/button";

import { MainSectionLayout } from "./MainSectionLayout";

export const MainFeatures = () => {
	const data = [
		{
			title: "eBPF Data Plane",
			description:
				"Achieve sub-millisecond P99 latency and linear CPU scaling by harnessing the power of eBPF for kernel-level packet processing.",
			image: "/images/main/icon_feature1.svg",
			footer: <DataList data={["<1ms P99 Latency", "Linear CPU Scaling"]} />,
		},
		{
			title: "Enterprise Reliability",
			description:
				"Built for mission-critical workloads with 99.999% uptime, Multi-AZ high availability, and dedicated 24/7 enterprise support.",
			image: "/images/main/icon_feature2.svg",
			footer: <DataList data={["99.999% Uptime", "Multi-AZ HA"]} />,
		},
		{
			title: "Specialized Protocols",
			description:
				"Support for complex, modern workloads including 5G/Telco protocols (SCTP, GTP), AI/ML inference, and Edge Computing.",
			image: "/images/main/icon_feature3.svg",
			footer: <DataList data={["5G/Telco Protocols", "AI/ML Workloads"]} />,
		},
	];
	return (
		<MainSectionLayout
			className=""
			title="A Complete Load Balancing Platform"
			description="From raw eBPF performance to enterprise-grade reliability and specialized protocols."
			bgImage={
				<BackgroundImage
					opacity="35"
					className="mix-blend-normal"
					src="/images/main/bg_features.jpg"
				/>
			}
		>
			<DataCard data={data} colors="blue" />
			<ButtonBox className="mt-20">
				<Button variant="primary">Explore All Features</Button>
			</ButtonBox>
		</MainSectionLayout>
	);
};
