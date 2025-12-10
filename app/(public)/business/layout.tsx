import { NAVIGATION_LIST } from "@/shared/config";
import { PageHero, PageTabs } from "@/views/_shared/ui";

export default function BusinessLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const tabs =
		NAVIGATION_LIST.find((item) => item.value === "business")?.children ?? [];
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
