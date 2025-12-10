import { NAVIGATION_LIST } from "@/shared/config";
import { PageHero, PageTabs } from "@/views/_shared/ui";

export default function TechnologyLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const tabs =
		NAVIGATION_LIST.find((item) => item.value === "technology")?.children ?? [];

	return (
		<>
			<PageHero
				title="NetLOX Technology"
				description={
					<>
						Explore our eBPF-powered architecture, comprehensive features,{" "}
						<br />
						and independently verified performance benchmarks.
					</>
				}
				image="/images/technology/bg_hero.jpg"
			/>
			<PageTabs tabs={tabs}>{children}</PageTabs>
		</>
	);
}
