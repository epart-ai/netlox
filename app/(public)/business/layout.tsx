import { ROUTES } from "@/shared/config/routes";
import { PageHero, PageTabs } from "@/views/_shared/ui";

export default function BusinessLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const tabs = [
		{
			label: "Pricing",
			value: "pricing",
			href: ROUTES.BUSINESS_PRICING,
		},
		{
			label: "Contact",
			value: "contact",
			href: ROUTES.BUSINESS_CONTACT,
		},
	];
	return (
		<>
			<PageHero
				title="NetLOX Business"
				description={
					<>
						Transparent pricing and direct access to our team. <br />
						Find the plan that fits your needs or contact us for a custom
						solution.
					</>
				}
				image="/images/business/bg_hero.jpg"
			/>
			<PageTabs tabs={tabs}>{children}</PageTabs>
		</>
	);
}
