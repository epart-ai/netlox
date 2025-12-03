import type { ThemeColor } from "@/shared/model/types";
import { DataCard, DataList, Reveal } from "@/shared/ui/display";

interface Props {
	themeColor?: ThemeColor;
}

export const TrustOverviewUseCaseIndustry = ({ themeColor }: Props) => {
	const cardData = [
		{
			title: "Technology & SaaS",
			icon: "/images/trust/icon_overview_use-case1.svg",
			footer: (
				<DataList
					data={[
						"Cloud-Native Applications",
						"AI/ML Inference APIs",
						"Multi-Cloud Hosting",
						"Online Gaming Platforms",
					]}
				/>
			),
		},
		{
			title: "Technology & SaaS",
			icon: "/images/trust/icon_overview_use-case2.svg",
			footer: (
				<DataList
					data={[
						"Industrial IoT (IIoT)",
						"Edge Computing Nodes",
						"Autonomous Vehicle Networks",
						"Real-time Data Processing",
					]}
				/>
			),
		},
		{
			title: "Technology & SaaS",
			icon: "/images/trust/icon_overview_use-case3.svg",
			footer: (
				<DataList
					data={[
						"High-Frequency Trading",
						"5G Core (UPF, SCP)",
						"Carrier-Grade Services",
						"Banking & Insurance Platforms",
					]}
				/>
			),
		},
	];

	return (
		<Reveal>
			<DataCard data={cardData} colors={themeColor} />
		</Reveal>
	);
};
