import { ROUTES } from "@/shared/config/routes";
import { PageHero, PageTabs } from "@/views/_shared/ui";

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
			<PageHero
				title="NetLOX Resource"
				description={
					<>
						Explore our technical documentation, user guides, API references,{" "}
						<br />
						and latest articles from the NetLOX team.
					</>
				}
				image="/images/resource/bg_hero.png"
			/>
			<PageTabs tabs={tabs} image="/images/common/bg_content.png">
				{children}
			</PageTabs>
		</>
	);
}
