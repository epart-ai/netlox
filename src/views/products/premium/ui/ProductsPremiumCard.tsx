import type { ThemeColor } from "@/shared/model/types";
import { sectionTitleLg } from "@/shared/styles/snippets";
import { DataCard, Reveal } from "@/shared/ui/display";

interface Props {
	themeColor: ThemeColor;
}

export const ProductsPremiumCard = ({ themeColor }: Props) => {
	const cardData = [
		{
			title: "Dedicated Engineer",
			description: (
				<>
					A named technical account manager <br />
					who knows your environment.
				</>
			),
			image: "/images/products/icon_premium_feature1.svg",
		},
		{
			title: "Custom Development",
			description: (
				<>
					Get custom features and protocols <br />
					developed for your needs.
				</>
			),
			image: "/images/products/icon_premium_feature2.svg",
		},
		{
			title: "Architecture Reviews",
			description: (
				<>
					Proactive architecture reviews <br />
					and optimization consulting.
				</>
			),
			image: "/images/products/icon_premium_feature3.svg",
		},
	];

	return (
		<Reveal delayMs={300}>
			<h3 className={sectionTitleLg}>Core Features</h3>
			<DataCard data={cardData} colors={themeColor} />
		</Reveal>
	);
};
