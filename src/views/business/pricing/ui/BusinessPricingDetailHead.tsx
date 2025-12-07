import { Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui";

export const BusinessPricingDetailHead = () => {
	return (
		<Reveal>
			<PageHead
				title="Plan Details"
				description="Deep dive into our commercial plans, built for professional teams and mission-critical applications."
				align="center"
			/>
		</Reveal>
	);
};
