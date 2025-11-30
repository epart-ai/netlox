import { DataTable } from "@/shared/ui/display";

import { rootReportTableColumns } from "../model/rootReportTableColumns";

export const RootReportTable = () => {
	const data = [
		{
			loadBalancer: "LoxiLB (eBPF)",
			throughput: "HIGH (10x vs MetalLB)",
			connections: "MILLIONS",
			p99LatencyMs: 0.8,
		},
		{
			loadBalancer: "MetalLB",
			throughput: "Moderate",
			connections: "Limited",
			p99LatencyMs: 7.0,
		},
		{
			loadBalancer: "HAProxy",
			throughput: "High",
			connections: "High",
			p99LatencyMs: 5.0,
		},
		{
			loadBalancer: "NGINX",
			throughput: "Moderate",
			connections: "Limited",
			p99LatencyMs: 8.0,
		},
	];

	return (
		<DataTable
			data={data}
			columns={rootReportTableColumns}
			tableClassName="min-w-[650px]"
			orientation="horizontal"
		/>
	);
};
