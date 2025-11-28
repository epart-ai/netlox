import Link from "next/link";

import { ROUTES } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import { beforeBackgroundImage } from "@/shared/styles/snippets";
import { Reveal, StatHighlights } from "@/shared/ui/display";
import { Button, ButtonBox } from "@/shared/ui/shadcn/button";

import { RootSectionLayout } from "./RootSectionLayout";

export const RootSuccess = () => {
	const data = [
		{
			highlight: {
				value: 10,
				unit: "×",
			},
			title: "Performance Improvement",
			description:
				"Global Electronics Leader reduced load balancer costs by 60% and achieved 10x performance.",
		},
		{
			highlight: {
				prefix: "<",
				value: 1,
				unit: "ms",
			},
			title: "Latency for AI Workloads",
			description:
				"Fortune 100 Software Company handles millions of AI inference requests with sub-millisecond latency.",
		},
		{
			highlight: {
				value: 99.999,
				unit: "%",
			},
			title: "Uptime for 5G Core",
			description:
				"Major Telco deployed a carrier-grade 5G core with 99.999% uptime using LoxiLB.",
		},
	];
	return (
		<RootSectionLayout
			eyebrow="Proven by Global Leaders"
			title="Trusted by Fortune 500s"
			className={cn(
				"bg-gradient-to-t from-blue-100/15 to-blue-40/15 before:bg-[url('/images/common/bg_content.png')] before:mix-blend-overlay",
				beforeBackgroundImage,
			)}
		>
			<Reveal delayMs={300}>
				<StatHighlights items={data} />
			</Reveal>
			<Reveal delayMs={450}>
				<ButtonBox className="mt-23">
					<Button asChild>
						<Link href={ROUTES.TRUST_SUCCESS_STORY}>
							<span>View All Success Stories</span>
						</Link>
					</Button>
				</ButtonBox>
			</Reveal>
		</RootSectionLayout>
	);
};
