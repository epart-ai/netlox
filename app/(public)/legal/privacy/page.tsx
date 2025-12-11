import { cn } from "@/shared/lib/utils";
import { gradientBackgroundBlack } from "@/shared/styles/snippets";
import { LegalHero } from "@/views/legal/_shared/ui";
import { PrivacyContents } from "@/views/legal/privacy/ui/PrivacyContents";

export default function LegalPrivacyPage() {
	return (
		<>
			<LegalHero
				title="Personal Information Processing Policy"
				date="Last Updated: 01/DEC/2025"
				description={
					<>
						<span>
							NetLOX (“we”, “our”, “us”), the maintainer of the open-source
							project <b>LoxiLB</b>, is committed to protecting the privacy and
							security of personal information.
							<br className="hidden md:block" />
							This Personal Information Processing Policy describes how we
							collect, use, store, and protect personal information
							<br className="hidden md:block" />
							when individuals access our website, products, services,
							documentation, or support channels.
						</span>
						<span>
							This policy is designed to comply with{" "}
							<b>international privacy standards,</b>
							<br className="hidden md:block" />
							including the{" "}
							<b>
								GDPR (EU), CCPA/CPRA (California), PIPEDA (Canada), APPI (Japan)
							</b>
							, and other global best practices.
						</span>
					</>
				}
			/>
			<div className={cn(gradientBackgroundBlack)}>
				<div className="wrapper">
					<PrivacyContents />
				</div>
			</div>
		</>
	);
}
