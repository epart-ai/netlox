"use client";

import type { ColumnDef } from "@tanstack/react-table";

export const technologyPerformanceLoadBalancerColumns: ColumnDef<
	Record<string, unknown>,
	unknown
>[] = [
	{
		accessorKey: "metric",
		header: "Metric",
		cell: ({ renderValue }) => (
			<span className="text-white">{String(renderValue())}</span>
		),
	},
	{
		accessorKey: "throughput",
		header: () => <span className="text-blue-20">Throughput</span>,
		cell: ({ row, renderValue }) => (
			<span className={row.index % 2 === 0 ? "text-green-10" : ""}>
				{String(renderValue())}
			</span>
		),
	},
	{
		accessorKey: "p99Latency",
		header: () => <span className="text-blue-20">P99 Latency</span>,
		cell: ({ row, renderValue }) => (
			<span className={row.index % 2 === 0 ? "text-green-10" : ""}>
				{String(renderValue())}
			</span>
		),
	},
	{
		accessorKey: "maxConnections",
		header: () => <span className="text-blue-20">Max Connections</span>,
		cell: ({ row, renderValue }) => (
			<span className={row.index % 2 === 0 ? "text-green-10" : ""}>
				{String(renderValue())}
			</span>
		),
	},
	{
		accessorKey: "cpuUsage",
		header: () => <span className="text-blue-20">CPU Usage</span>,
		cell: ({ row, renderValue }) => (
			<span className={row.index % 2 === 0 ? "text-green-10" : ""}>
				{String(renderValue())}
			</span>
		),
	},
];
