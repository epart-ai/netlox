import { ROUTES } from "@/shared/config/routes";
import { SubPageHero, SubPageTabs } from "@/shared/ui/display";

export default function ResourceLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const tabs = [
		{
			label: "Documentation",
			value: "documentation",
			href: ROUTES.RESOURCE_DOCUMENTATION,
		},
		{
			label: "Blog",
			value: "blog",
			href: ROUTES.RESOURCE_BLOG,
		},
		{
			label: "News",
			value: "news",
			href: ROUTES.RESOURCE_NEWS,
		},
	];
	return (
		<>
			<SubPageHero
				title="NetLOX Resource"
				description="From open-source community editions to 24/7 supported enterprise-grade deployments, NetLOX provides the right solution for your scale."
				image="/images/products/bg_hero.jpg"
			/>
			<SubPageTabs tabs={tabs} image="/images/common/bg_content.png">
				{children}
			</SubPageTabs>
		</>
	);
}
