"use client";

import type { ReactNode } from "react";

import type { ColumnDef } from "@tanstack/react-table";

export const productsEnterpriseComparisonColumns: ColumnDef<
	Record<string, unknown>,
	unknown
>[] = [
	{
		accessorKey: "feature",
		header: "Feature",
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "coreLoadBalancer",
		header: () => <span className="text-white/75">Core Load Balancer</span>,
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "ebpfDataPlane",
		header: () => <span className="text-white/75">eBPF Data Plane</span>,
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "basicL4Protocols",
		header: () => (
			<span className="text-white/75">Basic L4 Protocols (TCP/UDP)</span>
		),
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "kubernetesSupport",
		header: () => <span className="text-white/75">Kubernetes Support</span>,
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "documentationAccess",
		header: () => <span className="text-white/75">Documentation Access</span>,
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "support",
		header: () => <span className="text-white/75">Support</span>,
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "sla",
		header: () => <span className="text-white/75">SLA</span>,
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "advancedDashboard",
		header: () => <span className="text-white/75">Advanced Dashboard</span>,
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "highAvailability",
		header: () => <span className="text-white/75">High Availability (HA)</span>,
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "advancedLbAlgorithms",
		header: () => (
			<span className="text-white/75">Advanced LB Algorithms (GPU-aware)</span>
		),
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "securityPatching",
		header: () => <span className="text-white/75">Security Patching</span>,
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "telcoProtocols",
		header: () => (
			<span className="text-white/75">Telco Protocols (SCTP, NGAP)</span>
		),
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "advancedSecurities",
		header: () => (
			<span className="text-white/75">Advanced Securities (kTLS, DDoS)</span>
		),
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "customIntegrations",
		header: () => <span className="text-white/75">Custom Integrations</span>,
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "onlineTechTransfer",
		header: () => <span className="text-white/75">Online Tech Transfer</span>,
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
];
