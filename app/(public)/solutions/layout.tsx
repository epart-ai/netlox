import { ROUTES } from "@/shared/config/routes";
import { PageHero, PageTabs } from "@/views/_shared/ui";

export default function ProductsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const tabs = [
		{
			label: "AI LLM",
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
			href: ROUTES.SOLUTIONS_TELCO_5G,
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
				title="NetLOX Solutions"
				description="From open-source community editions to 24/7 supported enterprise-grade deployments, NetLOX provides the right solution for your scale."
				image="/images/products/bg_hero.jpg"
			/>
			<PageTabs tabs={tabs} image="/images/common/bg_content.png">
				{children}
			</PageTabs>
		</>
	);
}
