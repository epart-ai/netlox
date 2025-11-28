import { ROUTES } from "@/shared/config";
import { PageHero, PageTabs } from "@/views/_shared/ui";

export default function TrustLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const tabs = [
		{
			label: "Overview",
			value: "overview",
			href: ROUTES.TRUST_OVERVIEW,
		},
		{
			label: "Success Story",
			value: "successStory",
			href: ROUTES.TRUST_SUCCESS_STORY,
		},
	];
	return (
		<>
			<PageHero
				title="Trusted by Global Leaders"
				description={
					<>
						Proven results across industries and scales, <br />
						from Fortune 500 enterprises to major telecom operators.
					</>
				}
				image="/images/trust/bg_hero.jpg"
			/>
			<PageTabs tabs={tabs}>{children}</PageTabs>
		</>
	);
}
