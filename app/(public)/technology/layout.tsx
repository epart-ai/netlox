import { ROUTES } from "@/shared/config/routes";
import { SubPageHero, SubPageTabs } from "@/shared/ui/display";

export default function TechnologyLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const tabs = [
		{
			label: "Features",
			value: "features",
			href: ROUTES.TECHNOLOGY_FEATURES,
		},
		{
			label: "Performance",
			value: "performance",
			href: ROUTES.TECHNOLOGY_PERFORMANCE,
		},
	];
	return (
		<>
			<SubPageHero
				title="NetLOX Technology"
				description="From open-source community editions to 24/7 supported enterprise-grade deployments, NetLOX provides the right solution for your scale."
				image="/images/products/bg_hero.jpg"
			/>
			<SubPageTabs tabs={tabs} image="/images/common/bg_content.png">
				{children}
			</SubPageTabs>
		</>
	);
}
