import { ROUTES } from "@/shared/config/routes";
import { SubPageHero, SubPageTabs } from "@/shared/ui/display";

export default function TrustLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const tabs = [
		{
			label: "Success Story",
			value: "successStory",
			href: ROUTES.TRUST_SUCCESS_STORY,
		},
	];
	return (
		<>
			<SubPageHero
				title="NetLOX Trust"
				description="From open-source community editions to 24/7 supported enterprise-grade deployments, NetLOX provides the right solution for your scale."
				image="/images/products/bg_hero.jpg"
			/>
			<SubPageTabs tabs={tabs} image="/images/common/bg_content.png">
				{children}
			</SubPageTabs>
		</>
	);
}


