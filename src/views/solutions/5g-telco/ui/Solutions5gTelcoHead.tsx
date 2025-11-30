import type { ThemeColor } from "@/shared/model/types";
import { Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui";

interface Props {
	themeColor: ThemeColor;
}

export function Solutions5gTelcoHead({ themeColor }: Props) {
	return (
		<Reveal rootMargin="-25% 0px -25% 0px" threshold={0}>
			<PageHead
				eyebrow="5G&Telco"
				title="Carrier-Grade Load Balancing for 5G Core"
				description={
					<div className="space-y-3">
						<p>
							Deploy a cloud-native 5G core with 99.999% uptime. NetLOX provides
							native support <br />
							for critical telco protocols, ensuring carrier-grade reliability.
						</p>
						<p>
							Customer Impact:
							<strong>
								&quot;Major Telco deployed with &lt; 100µs packet processing
								latency.&quot;
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
