import type { ThemeColor } from "@/shared/model/types";
import { Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui";

interface Props {
	themeColor: ThemeColor;
}

export function SolutionsAiLlmHead({ themeColor }: Props) {
	return (
		<Reveal rootMargin="-25% 0px -25% 0px" threshold={0}>
			<PageHead
				eyebrow="AI/LLM Workloads"
				title="Reliable Load Balancing for AI/LLM"
				description={
					<div className="space-y-3">
						<p>
							Handle millions of daily inference requests with session state
							preservation. <br />
							Optimize GPU utilization and reduce costs by 40% with eBPF-powered
							routing.
						</p>
						<p>
							Customer Impact: 
							<strong>
								&quot;Major AI Company serves 100M+ LLM requests daily.&quot;
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
