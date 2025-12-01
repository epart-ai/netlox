"use client";

import type { ColumnDef } from "@tanstack/react-table";

export const rootReportTableColumns: ColumnDef<
	Record<string, unknown>,
	unknown
>[] = [
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
				<span className={color}>{ms < 1 ? "< 1ms" : `${ms.toFixed(1)}ms`}</span>
			);
		},
		meta: { className: "w-[20%]" },
	},
];
