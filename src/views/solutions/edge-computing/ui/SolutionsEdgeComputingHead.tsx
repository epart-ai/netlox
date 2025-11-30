import type { ThemeColor } from "@/shared/model/types";
import { Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui";

interface Props {
	themeColor: ThemeColor;
}

export function SolutionsEdgeComputingHead({ themeColor }: Props) {
	return (
		<Reveal rootMargin="-25% 0px -25% 0px" threshold={0}>
			<PageHead
				eyebrow="Edge Computing"
				title="Ultra-Lightweight Load Balancing for Edge"
				description={
					<div className="space-y-3">
						<p>
							Deploy high-performance load balancing in resource-constrained
							environments. <br />
							NetLOX provides &lt;200µs P99 latency with a minimal footprint.
						</p>
						<p>
							Customer Impact:
							<strong>
								&quot;500+ edge nodes, 80% latency reduction.&quot;
							</strong>
						</p>
					</div>
				}
				align="center"
				theme={themeColor}
			/>
		</Reveal>
	);
}
