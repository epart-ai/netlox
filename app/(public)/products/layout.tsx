import { ROUTES } from "@/shared/config/routes";
import { PageHero, PageTabs } from "@/views/_shared/ui";

export default function ProductsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const tabs = [
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
		{
			label: "Open Source",
			value: "openSource",
			href: ROUTES.PRODUCTS_OPEN_SOURCE,
		},
	];
	return (
		<>
			<PageHero
				title="NetLOX Products"
				description={
					<>
						From open-source community editions to 24/7 supported <br />
						enterprise-grade deployments, NetLOX provides the right solution for
						your scale.
					</>
				}
				image="/images/products/bg_hero.jpg"
			/>
			<PageTabs tabs={tabs}>{children}</PageTabs>
		</>
	);
}
