"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTable, Reveal } from "@/shared/ui/display";

export const SolutionsKubernetesTable = () => {
	const columns: ColumnDef<Record<string, unknown>, unknown>[] = [
		{
			accessorKey: "metric",
			header: "Metric",
			cell: ({ renderValue }) => (
				<span className="text-blue-20">{String(renderValue())}</span>
			),
		},
		{
			accessorKey: "loxilb",
			header: "LoxiLB (eBPF)",
			cell: ({ renderValue }) => (
				<span className="text-green-10">{String(renderValue())}</span>
			),
		},
		{
			accessorKey: "metalb",
			header: "MetalLB (IPTables)",
		},
	];

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
		<Reveal delayMs={300}>
			<DataTable
				data={data}
				columns={columns}
				tableClassName="min-w-[650px]"
				className="glass-surface"
			/>
		</Reveal>
	);
};
