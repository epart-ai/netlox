import { sectionTitle } from "@/shared/styles/snippets";
import { DataTable, Reveal } from "@/shared/ui/display";

import { solutionsKubernetesBenchmarksColumns } from "../model/solutionsKubernetesBenchmarksColumns";

export const SolutionsKubernetesBenchmarks = () => {
	const data = [
		{
			metric: "Throughput",
			loxilb: "HIGH (10x)",
			metalb: "Moderate",
		},
		{
			metric: "P99 Latency",
			loxilb: "< 1ms",
			metalb: "Higher (5-10ms)",
		},
		{
			metric: "Max Connections",
			loxilb: "Millions",
			metalb: "Limited (100K)",
		},
		{
			metric: "CPU Usage",
			loxilb: "Minimal (< 5%)",
			metalb: "CPU-intensive (40%+)",
		},
		{
			metric: "Protocols",
			loxilb: "All (TCP, UDP, SCTP)",
			metalb: "Basic TCP/UDP",
		},
	];

	return (
		<Reveal>
			<h3 className={sectionTitle}>Verified Benchmarks: LoxiLB vs MetalLB</h3>
			<DataTable data={data} columns={solutionsKubernetesBenchmarksColumns} />
		</Reveal>
	);
};
