import { sectionTitle } from "@/shared/styles/snippets";
import { DataTable, Reveal } from "@/shared/ui/display";

import { technologyPerformanceLoadBalancerColumns } from "../model/technologyPerformanceLoadBalancerColumns";

export const TechnologyPerformanceLoadBalancer = () => {
	const data = [
		{
			metric: "LoxiLB (eBPF)",
			throughput: "HIGH",
			p99Latency: "< 1ms",
			maxConnections: "Millions",
			cpuUsage: "< 5%",
		},
		{
			metric: "MetalLB (IPTables)",
			throughput: "Moderate",
			p99Latency: "5-10ms)",
			maxConnections: "100K",
			cpuUsage: "40%+",
		},
		{
			metric: "Improvement",
			throughput: "10x",
			p99Latency: "70% lower",
			maxConnections: "100x",
			cpuUsage: "90% lower",
		},
	];

	return (
		<Reveal>
			<h3 className={sectionTitle}>Kubernetes Load Balancer Comparison</h3>
			<DataTable
				data={data}
				columns={technologyPerformanceLoadBalancerColumns}
				orientation="vertical"
			/>
		</Reveal>
	);
};
