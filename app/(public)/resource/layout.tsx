import { NAVIGATION_LIST } from "@/shared/config";
import { PageHero, PageTabs } from "@/views/_shared/ui";

export default function ResourceLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const tabs =
		NAVIGATION_LIST.find((item) => item.value === "resource")?.children ?? [];

	return (
		<>
			<PageHero
				title="NetLOX Resource"
				description={
					<>
						Explore our technical documentation, user guides, API references,
						<br />
						and latest articles from the NetLOX team.
					</>
				}
				image="/images/resource/bg_hero.jpg"
			/>
			<PageTabs tabs={tabs}>{children}</PageTabs>
		</>
	);
}
