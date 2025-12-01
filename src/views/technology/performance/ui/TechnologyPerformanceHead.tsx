import { Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui";

export const TechnologyPerformanceHead = () => {
	return (
		<Reveal rootMargin="-25% 0px -25% 0px" threshold={0}>
			<PageHead
				eyebrow="Performance"
				title="Independently Verified Performance"
				description={
					<>
						Transparent benchmarks with reproducible results. LoxiLB
						consistently outperforms alternatives by 10x <br />
						with 70% lower latency and 90% lower CPU usage.
					</>
				}
				align="center"
			/>
		</Reveal>
	);
};
