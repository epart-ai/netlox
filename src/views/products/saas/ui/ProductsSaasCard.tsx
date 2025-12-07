import type { ThemeColor } from "@/shared/model/types";
import { sectionTitle } from "@/shared/styles/snippets";
import { DataCard, Reveal } from "@/shared/ui/display";

interface Props {
	themeColor: ThemeColor;
}

export const ProductsSaasCard = ({ themeColor }: Props) => {
	const cardData = [
		{
			title: "5-Minute Deployment",
			description: (
				<>
					Get up and running instantly
					<br />
					via AWS Marketplace.
				</>
			),
			icon: "/images/products/icon_saas_feature1.svg",
		},
		{
			title: "Automatic Scaling",
			description: (
				<>
					Automatically scales
					<br />
					with your workload demands.
				</>
			),
			icon: "/images/products/icon_saas_feature2.svg",
		},
		{
			title: "AWS Native Billing",
			description: (
				<>
					All charges are integrated directly
					<br />
					into your AWS bill.
				</>
			),
			icon: "/images/products/icon_saas_feature3.svg",
		},
	];

	return (
		<Reveal>
			<h3 className={sectionTitle}>Core Features</h3>
			<DataCard data={cardData} colors={themeColor} />
		</Reveal>
	);
};
