import { Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui";

export const BusinessPricingPlanHead = () => {
	return (
		<Reveal rootMargin="-25% 0px -25% 0px" threshold={0}>
			<PageHead
				eyebrow="Pricing"
				title="Transparent Pricing for Every Scale"
				description="From community and open-source to mission-critical enterprise deployments, we have a plan that fits your needs."
				align="center"
			/>
		</Reveal>
	);
};
