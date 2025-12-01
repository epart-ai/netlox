import { cn } from "@/shared/lib/utils";
import {
	beforeBackgroundImage,
	contentPadding,
	pageBackground,
} from "@/shared/styles/snippets";
import { PageHero } from "@/views/_shared/ui";

export default function TrustLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
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
			<div
				className={cn(contentPadding, beforeBackgroundImage, pageBackground)}
			>
				<div className="wrapper">{children}</div>
			</div>
		</>
	);
}
