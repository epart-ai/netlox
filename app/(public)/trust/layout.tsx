import { ROUTES } from "@/shared/config/routes";
import { PageHero, PageTabs } from "@/views/_shared/ui";

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
			<PageTabs tabs={tabs} image="/images/common/bg_content.png">
				{children}
			</PageTabs>
		</>
	);
}
