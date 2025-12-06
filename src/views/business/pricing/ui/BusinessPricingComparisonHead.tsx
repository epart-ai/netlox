import { Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui";

export const BusinessPricingComparisonHead = () => {
	return (
		<Reveal>
			<PageHead
				title="Detailed Feature Comparison"
				description="Compare Enterprise features against Open Source, Premium, and SaaS plans."
				align="center"
			/>
		</Reveal>
	);
};
