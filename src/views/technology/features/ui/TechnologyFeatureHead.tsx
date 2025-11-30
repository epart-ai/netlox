import { Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui";

export const TechnologyFeatureHead = () => {
	return (
		<Reveal rootMargin="-25% 0px -25% 0px" threshold={0}>
			<PageHead
				eyebrow="Features"
				title="Complete Load Balancing Platform"
				description={
					<>
						Comprehensive capabilities for modern infrastructure, from
						kernel-level eBPF processing <br />
						to advanced Layer 7 routing and multi-cloud high availability.
					</>
				}
				align="center"
			/>
		</Reveal>
	);
};
