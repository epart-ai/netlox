import type { ThemeColor } from "@/shared/model/types";
import { Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui";

interface Props {
	themeColor?: ThemeColor;
}

export function SolutionsKubernetesHead({ themeColor }: Props) {
	return (
		<Reveal rootMargin="-25% 0px -25% 0px" threshold={0}>
			<PageHead
				eyebrow="Kubernetes"
				title="MetalLB Alternative with 10x Performance"
				description={
					<>
						Replace CPU-intensive IPTables/IPVS-based solutions like MetalLB
						with an eBPF-powered data plane. <br />
						Achieve 10x throughput and &lt;1ms P99 latency.
					</>
				}
				align="center"
				theme={themeColor}
			/>
		</Reveal>
	);
}
