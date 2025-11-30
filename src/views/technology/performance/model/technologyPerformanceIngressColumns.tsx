"use client";

import type { ColumnDef } from "@tanstack/react-table";

export const technologyPerformanceIngressColumns: ColumnDef<
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
		accessorKey: "requestsPerSecond",
		header: () => <span className="text-white/75">Requests/sec</span>,
		cell: ({ row, renderValue }) => (
			<span className={row.index === 0 ? "text-green-10" : ""}>
				{String(renderValue())}
			</span>
		),
	},
	{
		accessorKey: "sslHandshakesPerSecond",
		header: () => <span className="text-white/75">SSL Handshakes/s</span>,
		cell: ({ row, renderValue }) => (
			<span className={row.index === 0 ? "text-green-10" : ""}>
				{String(renderValue())}
			</span>
		),
	},
	{
		accessorKey: "memoryPerConnection",
		header: () => <span className="text-white/75">Memory per Conn</span>,
		cell: ({ row, renderValue }) => (
			<span className={row.index === 0 ? "text-green-10" : ""}>
				{String(renderValue())}
			</span>
		),
	},
	{
		accessorKey: "configReload",
		header: () => <span className="text-white/75">Config Reload</span>,
		cell: ({ row, renderValue }) => (
			<span className={row.index === 0 ? "text-green-10" : ""}>
				{String(renderValue())}
			</span>
		),
	},
];
