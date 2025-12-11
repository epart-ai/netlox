import { cn } from "@/shared/lib/utils";
import { gradientBackgroundBlack } from "@/shared/styles/snippets";
import { LegalHero } from "@/views/legal/_shared/ui";
import { CookiesContents } from "@/views/legal/cookies/ui/CookiesContents";

export default function LegalCookiesPage() {
	return (
		<>
			<LegalHero
				title="Cookie Policy"
				date="Last Updated: 01/DEC/2025"
				description={
					<>
						<span>
							This Cookie Policy explains how <b>NetLOX</b> (“we”, “our”, “us”)
							uses cookies and similar tracking technologies{" "}
							<br className="hidden md:block" />
							when you visit our website, documentation portal, or online
							services (“Services”).
						</span>
						<span>
							We are committed to being transparent about the technologies we
							use and how they affect your privacy.
						</span>
					</>
				}
			/>
			<div className={cn(gradientBackgroundBlack)}>
				<div className="wrapper">
					<CookiesContents />
				</div>
			</div>
		</>
	);
}
