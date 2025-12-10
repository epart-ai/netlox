import { DataTable } from "@/shared/ui/display";

import { rootReportTableColumns } from "../model/rootReportTableColumns";

export const RootReportTable = () => {
	const data = [
		{
			loadBalancer: <span className="text-green-20">LoxiLB (eBPF)</span>,
			throughput: <span className="text-green-20">HIGH (10x vs MetalLB)</span>,
			connections: <span className="text-green-20">MILLIONS</span>,
			p99LatencyMs: <span className="text-green-20">&lt; 1ms</span>,
		},
		{
			loadBalancer: "MetalLB",
			throughput: "Moderate",
			connections: "Limited",
			p99LatencyMs: "5-10ms",
		},
		{
			loadBalancer: "HAProxy",
			throughput: "High",
			connections: "High",
			p99LatencyMs: "~5ms",
		},
		{
			loadBalancer: "NGINX",
			throughput: "Moderate",
			connections: "Limited",
			p99LatencyMs: "~8ms",
		},
	];

	return (
		<DataTable
			data={data}
			columns={rootReportTableColumns}
			orientation="horizontal"
			selectedRowIndex={0}
		/>
	);
};
