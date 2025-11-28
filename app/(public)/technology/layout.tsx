import { ROUTES } from "@/shared/config/routes";
import { PageHero, PageTabs } from "@/views/_shared/ui";

export default function TechnologyLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const tabs = [
		{
			label: "Features",
			value: "features",
			href: ROUTES.TECHNOLOGY_FEATURES,
		},
		{
			label: "Performance",
			value: "performance",
			href: ROUTES.TECHNOLOGY_PERFORMANCE,
		},
	];
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
