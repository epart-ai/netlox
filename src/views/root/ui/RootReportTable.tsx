"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/shared/ui/display";

export const RootReportTable = () => {
	const columns: ColumnDef<Record<string, unknown>, unknown>[] = [
		{
			accessorKey: "loadBalancer",
			header: "Load Balancer",
			meta: { className: "w-[20%]" },
		},
		{
			accessorKey: "throughput",
			header: "Throughput",
			cell: ({ getValue }) => {
				const value = String(getValue() ?? "");
				const color = value.toUpperCase().includes("HIGH")
					? "text-green-20"
					: "text-orange-20";
				return <span className={color}>{value}</span>;
			},
			meta: { className: "w-[40%]" },
		},
		{
			accessorKey: "connections",
			header: "Connections",
			cell: ({ getValue }) => {
				const value = String(getValue() ?? "");
				const color =
					value.toUpperCase().includes("HIGH") ||
					value.toUpperCase().includes("MILLIONS")
						? "text-green-20"
						: "text-orange-20";
				return <span className={color}>{value}</span>;
			},
			meta: { className: "w-[20%]" },
		},
		{
			id: "p99",
			header: "P99 Latency",
			cell: ({ row }) => {
				const original = row.original;
				const ms = Number(original?.p99LatencyMs ?? 0);
				const color = ms < 1 ? "text-green-20" : "text-orange-20";
				return (
					<span className={color}>
						{ms < 1 ? "< 1ms" : `${ms.toFixed(1)}ms`}
					</span>
				);
			},
			meta: { className: "w-[20%]" },
		},
	];

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
		<DataTable data={data} columns={columns} tableClassName="min-w-[650px]" />
	);
};
