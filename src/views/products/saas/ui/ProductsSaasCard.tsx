import type { ThemeColor } from "@/shared/model/types";
import { sectionTitle } from "@/shared/styles/snippets";
import { DataCard, Reveal } from "@/shared/ui/display";

interface Props {
	themeColor: ThemeColor;
}

export const ProductsSaasCard = ({ themeColor }: Props) => {
	const cardData = [
		{
			title: "eBPF Data Plan",
			description: (
				<>
					Maximum performance with
					<br />
					kernel-level packet processing.
				</>
			),
			icon: "/images/products/icon_saas_feature1.svg",
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
			icon: "/images/products/icon_saas_feature2.svg",
		},
		{
			title: "Community Support",
			description: (
				<>
					Get help and contribute via CNCF Slack <br />
					and GitHub Issues.
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
