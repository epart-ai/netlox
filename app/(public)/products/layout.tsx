import { ROUTES } from "@/shared/config/routes";
import { SubPageHero, SubPageTabs } from "@/shared/ui/display";

export default function ProductsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const tabs = [
		{
			label: "Open Source",
			value: "openSource",
			href: ROUTES.PRODUCTS_OPEN_SOURCE,
		},
		{
			label: "Enterprise",
			value: "enterprise",
			href: ROUTES.PRODUCTS_ENTERPRISE,
		},
		{
			label: "Premium",
			value: "premium",
			href: ROUTES.PRODUCTS_PREMIUM,
		},
		{
			label: "SaaS",
			value: "saas",
			href: ROUTES.PRODUCTS_SAAS,
		},
	];
	return (
		<>
			<SubPageHero
				title="NetLOX Products"
				description="From open-source community editions to 24/7 supported enterprise-grade deployments, NetLOX provides the right solution for your scale."
				image="/images/products/bg_hero.jpg"
			/>
			<SubPageTabs tabs={tabs} image="/images/common/bg_content.png">
				{children}
			</SubPageTabs>
		</>
	);
}
