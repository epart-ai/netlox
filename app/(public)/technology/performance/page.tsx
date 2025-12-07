import Link from "next/link";

import { Reveal } from "@/shared/ui/display";
import { Button } from "@/shared/ui/shadcn/button";
import {
	TechnologyPerformanceHead,
	TechnologyPerformanceIngress,
	TechnologyPerformanceLoadBalancer,
} from "@/views/technology/performance/ui";

export default function TechnologyPerformancePage() {
	return (
		<>
			<TechnologyPerformanceHead />
			<div className="mt-10 lg:mt-20">
				<TechnologyPerformanceLoadBalancer />
			</div>
			<div className="mt-14 lg:mt-[100px]">
				<TechnologyPerformanceIngress />
			</div>
			<div className="mt-20 text-center">
				<Reveal>
					<Button asChild>
						<Link
							href="https://docs.loxilb.io/latest/perf/"
							className="m-auto"
							target="_blank"
						>
							Download Full Benchmark Report
						</Link>
					</Button>
				</Reveal>
			</div>
		</>
	);
}
