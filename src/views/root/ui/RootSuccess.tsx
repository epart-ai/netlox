import { BackgroundImage, Reveal, StatHighlights } from "@/shared/ui/display";
import { Button, ButtonBox } from "@/shared/ui/shadcn/button";

import { RootSectionLayout } from "./RootSectionLayout";

export const RootSuccess = () => {
	const data = [
		{
			highlight: "10×",
			title: "Performance Improvement",
			description:
				"Global Electronics Leader reduced load balancer costs by 60% and achieved 10x performance.",
		},
		{
			highlight: "<1ms",
			title: "Latency for AI Workloads",
			description:
				"Fortune 100 Software Company handles millions of AI inference requests with sub-millisecond latency.",
		},
		{
			highlight: "99.999%",
			title: "Uptime for 5G Core",
			description:
				"Major Telco deployed a carrier-grade 5G core with 99.999% uptime using LoxiLB.",
		},
	];
	return (
		<RootSectionLayout
			eyebrow="Proven by Global Leaders"
			title="Trusted by Fortune 500s"
			bgImage={
				<BackgroundImage
					className="mix-blend-overlay"
					src="/images/common/bg_content.png"
				/>
			}
			className="bg-gradient-to-t from-blue-100/15 to-blue-40/15"
		>
			<Reveal delayMs={300}>
				<StatHighlights items={data} />
			</Reveal>
			<Reveal delayMs={450}>
				<ButtonBox className="mt-23">
					<Button variant="primary">View All Success Stories</Button>
				</ButtonBox>
			</Reveal>
		</RootSectionLayout>
	);
};
