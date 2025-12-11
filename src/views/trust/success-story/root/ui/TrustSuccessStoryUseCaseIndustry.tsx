import type { ThemeColor } from "@/shared/model/types";
import { DataCard, DataList, Reveal } from "@/shared/ui/display";

interface Props {
	themeColor?: ThemeColor;
}

export const TrustSuccessStoryUseCaseIndustry = ({ themeColor }: Props) => {
	const cardData = [
		{
			title: "Technology & SaaS",
			icon: "/images/trust/icon_success-story_use-case1.svg",
			footer: (
				<DataList
					variant="subtle"
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
			title: "Manufacturing & IoT",
			icon: "/images/trust/icon_success-story_use-case2.svg",
			footer: (
				<DataList
					variant="subtle"
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
			title: "Financial & Telco",
			icon: "/images/trust/icon_success-story_use-case3.svg",
			footer: (
				<DataList
					variant="subtle"
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
