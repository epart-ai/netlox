import { NAVIGATION_LIST } from "@/shared/config";
import { PageHero, PageTabs } from "@/views/_shared/ui";

export default function ProductsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const tabs =
		NAVIGATION_LIST.find((item) => item.value === "product")?.children ?? [];

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
