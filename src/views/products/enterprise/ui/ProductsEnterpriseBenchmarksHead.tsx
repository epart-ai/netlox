import { Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui/PageHead";

export const ProductsEnterpriseBenchmarksHead = () => {
	return (
		<Reveal>
			<PageHead
				title="Enterprise Performance Benchmarks"
				description={
					<>
						See how LoxiLB&apos;s eBPF data plane delivers superior throughput
						and latency compared to <br />
						common alternatives like MetalLB, NGINX, and HAProxy.
					</>
				}
			/>
		</Reveal>
	);
};
