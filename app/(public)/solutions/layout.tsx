import { ROUTES } from "@/shared/config/routes";
import { PageHero, PageTabs } from "@/views/_shared/ui";

export default function ProductsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const tabs = [
		{
			label: "AI/LLM Workloads",
			value: "aiLlm",
			href: ROUTES.SOLUTIONS_AI_LLM,
		},
		{
			label: "Kubernetes",
			value: "kubernetes",
			href: ROUTES.SOLUTIONS_KUBERNETES,
		},
		{
			label: "5G&Telco",
			value: "telco5g",
			href: ROUTES.SOLUTIONS_5G_TELCO,
		},
		{
			label: "Edge Computing",
			value: "edgeComputing",
			href: ROUTES.SOLUTIONS_EDGE_COMPUTING,
		},
	];
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
