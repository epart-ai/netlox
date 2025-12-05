import type { ThemeColor } from "@/shared/model/types";
import { sectionTitle } from "@/shared/styles/snippets";
import { DataCard, Reveal } from "@/shared/ui/display";
import {
	enterpriseParagraphLead,
	enterpriseSectionTitle,
} from "@/views/products/enterprise/styles/snippets";

interface Props {
	themeColor?: ThemeColor;
}
export const ProductsEnterpriseProduction = ({ themeColor }: Props) => {
	const includedData = [
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

	const bestProductionData = [
		{
			title: "8x5 Technical Support",
			icon: "/images/products/icon_enterprise_feature1.svg",
		},
		{
			title: (
				<>
					Advanced LB Algorithms <br />
					(GPU-aware)
				</>
			),
			icon: "/images/products/icon_enterprise_feature2.svg",
		},
		{
			title: "HA Configuration",
			icon: "/images/products/icon_enterprise_feature3.svg",
		},
	];

	return (
		<>
			<Reveal>
				<h3 className={sectionTitle}>What&apos;s Included?</h3>
				<DataCard data={includedData} colors={themeColor} />
			</Reveal>
			<div className="mt-15 lg:mt-[108px]">
				<Reveal>
					<h3 className={enterpriseSectionTitle}>Best For Production</h3>
					<p className={enterpriseParagraphLead}>
						NetLOX Enterprise is designed for mid-to-large enterprises,
						production Kubernetes clusters, and mission-critical applications{" "}
						<br />
						that require a 99.9% uptime SLA and professional support.
					</p>
					<DataCard
						data={bestProductionData}
						colors={themeColor}
						className="mt-12.5 [&_.card-title]:title-14 md:[&_.card-title]:title-16 lg:[&_.card-title]:title-20 [&_.card-content]:!mt-0 [&_.card-wrapper]:flex [&_.card-wrapper]:items-center [&_.card-wrapper]:gap-4 md:[&_.card-wrapper]:gap-6 lg:[&_.card-wrapper]:gap-8"
					/>
				</Reveal>
			</div>
		</>
	);
};
