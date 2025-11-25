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
					<Button variant="primary">Download Full Report</Button>
					<Button variant="secondary">See Test Methodology</Button>
				</ButtonBox>
			</Reveal>
		</RootSectionLayout>
	);
};
