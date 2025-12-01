import type { ThemeColor } from "@/shared/model/types";
import { sectionTitle } from "@/shared/styles/snippets";
import { DataCard, Reveal } from "@/shared/ui/display";

interface Props {
	themeColor?: ThemeColor;
}
export const ProductsEnterpriseCard = ({ themeColor }: Props) => {
	const cardData = [
		{
			title: "Business Hours Support",
			description: (
				<>
					Access our expert engineering team <br /> (9AM-6PM).
				</>
			),
			icon: "/images/products/icon_enterprise_feature1.svg",
		},
		{
			title: "Security Patching",
			description: (
				<>
					Receive timely security updates <br /> and patches.
				</>
			),
			icon: "/images/products/icon_enterprise_feature2.svg",
		},
		{
			title: "High Availability (HA)",
			description: (
				<>
					Includes configuration support <br /> for multi-AZ resilience.
				</>
			),
			icon: "/images/products/icon_enterprise_feature3.svg",
		},
	];

	return (
		<Reveal>
			<h3 className={sectionTitle}>Core Features</h3>
			<DataCard data={cardData} colors={themeColor} />
		</Reveal>
	);
};
