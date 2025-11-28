import Link from "next/link";

import { ROUTES } from "@/shared/config";
import { Reveal } from "@/shared/ui/display";
import { Button, ButtonBox } from "@/shared/ui/shadcn/button";
import { RootReportTable } from "@/views/root/ui/RootReportTable";

import { RootSectionLayout } from "./RootSectionLayout";

export const RootReport = () => {
	return (
		<RootSectionLayout
			eyebrow="Independently Verified Performance"
			title="Unmatched Throughput & Latency"
			description={
				<>
					NetLOX leverages eBPF to deliver millions of connections with minimal
					resource usage, <br />
					outperforming traditional load balancers like MetalLB and NGINX.
				</>
			}
		>
			<Reveal delayMs={300}>
				<RootReportTable />
			</Reveal>
			<Reveal delayMs={450}>
				<ButtonBox className="mt-10 lg:mt-20">
					<Button>Download Full Report</Button>
					<Button asChild variant="secondary">
						<Link href={ROUTES.RESOURCE_BLOG}>
							<span>See Test Methodology</span>
						</Link>
					</Button>
				</ButtonBox>
			</Reveal>
		</RootSectionLayout>
	);
};
