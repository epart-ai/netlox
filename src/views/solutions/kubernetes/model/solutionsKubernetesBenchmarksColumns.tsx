"use client";

import type { ColumnDef } from "@tanstack/react-table";

export const solutionsKubernetesBenchmarksColumns: ColumnDef<
	Record<string, unknown>,
	unknown
>[] = [
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
