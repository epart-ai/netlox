"use client";

import type { ReactNode } from "react";

import type { ColumnDef } from "@tanstack/react-table";

export const rootReportTableColumns: ColumnDef<
	Record<string, unknown>,
	unknown
>[] = [
	{
		accessorKey: "loadBalancer",
		header: "Load Balancer",
		meta: { className: "w-[20%]" },
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "throughput",
		header: "Throughput",
		meta: { className: "w-[40%]" },
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "connections",
		header: "Connections",
		meta: { className: "w-[20%]" },
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "p99LatencyMs",
		header: "P99 Latency",
		meta: { className: "w-[20%]" },
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
];
