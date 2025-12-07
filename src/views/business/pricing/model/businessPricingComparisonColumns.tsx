"use client";

import type { ReactNode } from "react";

import type { ColumnDef } from "@tanstack/react-table";

export const businessPricingComparisonColumns: ColumnDef<
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
		accessorKey: "kubernetesSupport",
		header: () => <span className="text-white/75">Kubernetes Support</span>,
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
		accessorKey: "securityPatching",
		header: () => <span className="text-white/75">Security Patching</span>,
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "customDevelopment",
		header: () => <span className="text-white/75">Custom Development</span>,
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "dedicatedEngineer",
		header: () => <span className="text-white/75">Dedicated Engineer</span>,
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "architectureReview",
		header: () => <span className="text-white/75">Architecture Review</span>,
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
		accessorKey: "responseTime",
		header: () => <span className="text-white/75">Response Time</span>,
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "deploymentSupport",
		header: () => <span className="text-white/75">Deployment Support</span>,
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
];
