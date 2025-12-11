import { cn } from "@/shared/lib/utils";
import { gradientBackgroundBlack } from "@/shared/styles/snippets";
import { LegalHero } from "@/views/legal/_shared/ui";
import { TermsContents } from "@/views/legal/terms/ui";

export default function LegalTermsPage() {
	return (
		<>
			<LegalHero
				title="Terms and Conditions"
				date="Last Updated: 01/DEC/2025"
				description={
					<>
						<span>
							Welcome to NetLOX. These Terms and Conditions (“Terms”) govern
							your access to and use of our website, products, documentation,
							software,
							<br className="hidden md:block" /> and services (“Services”),
							including our open-source project LoxiLB and any commercial or
							enterprise offerings.
						</span>
						<span>
							By accessing or using our Services, you agree to be bound by these
							Terms. If you do not agree, please discontinue use immediately.
						</span>
					</>
				}
			/>
			<div className={cn(gradientBackgroundBlack)}>
				<div className="wrapper">
					<TermsContents />
				</div>
			</div>
		</>
	);
}
