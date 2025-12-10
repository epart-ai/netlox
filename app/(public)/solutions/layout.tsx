import { NAVIGATION_LIST } from "@/shared/config";
import { PageHero, PageTabs } from "@/views/_shared/ui";

export default function ProductsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const tabs =
		NAVIGATION_LIST.find((item) => item.value === "solutions")?.children ?? [];
	return (
		<>
			<PageHero
				title="Solutions for Modern Infrastructure"
				description={
					<>
						Optimized performance for your most demanding workloads, <br />
						from hyperscale AI platforms to resource-constrained Edge nodes.
					</>
				}
				image="/images/solutions/bg_hero.jpg"
			/>
			<PageTabs tabs={tabs}>{children}</PageTabs>
		</>
	);
}
