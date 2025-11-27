import type { ThemeColor } from "@/shared/model/types";
import { sectionTitleLg } from "@/shared/styles/snippets";
import { DataCard, Reveal } from "@/shared/ui/display";

interface Props {
	themeColor: ThemeColor;
}

export const ProductsOpenSourceCard = ({ themeColor }: Props) => {
	const cardData = [
		{
			title: "Business Hours Support",
			description: (
				<>
					Maximum performance with
					<br />
					kernel-level packet processing.
				</>
			),
			image: "/images/products/icon_open-source_feature1.svg",
		},
		{
			title: "Kubernetes Integration",
			description: (
				<>
					Native support for kube-loxilb,
					<br />
					Service type LB, and more.
				</>
			),
			image: "/images/products/icon_open-source_feature2.svg",
		},
		{
			title: "Community Support",
			description: (
				<>
					Get help and contribute via CNCF Slack <br />
					and GitHub Issues.
				</>
			),
			image: "/images/products/icon_open-source_feature3.svg",
		},
	];

	return (
		<Reveal delayMs={300}>
			<h3 className={sectionTitleLg}>Core Features</h3>
			<DataCard data={cardData} enableHover={true} colors={themeColor} />
		</Reveal>
	);
};
