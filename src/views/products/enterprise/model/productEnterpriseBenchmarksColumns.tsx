"use client";

import type { ReactNode } from "react";

import type { ColumnDef } from "@tanstack/react-table";

export const productEnterpriseBenchmarkSameNodeColumns: ColumnDef<
	Record<string, unknown>,
	unknown
>[] = [
	{
		accessorKey: "podOnSameNodeInGbps",
		header: "POD ON SAME NODE (IN GBPS)",
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "oneConnection",
		header: "1 connection",

		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "eightConnections",
		header: "8 connections",

		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
];

export const productEnterpriseBenchmarkDifferentNodeColumns: ColumnDef<
	Record<string, unknown>,
	unknown
>[] = [
	{
		accessorKey: "podOnDifferentNodeInGbps",
		header: "POD ON DIFFERENT NODE (IN GBPS)",
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "oneConnection",
		header: "1 connection",

		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "eightConnections",
		header: "8 connections",

		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
];

export const productEnterpriseBenchmarkConnectionsColumns: ColumnDef<
	Record<string, unknown>,
	unknown
>[] = [
	{
		accessorKey: "connections",
		header: "Connections",
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "one",
		header: "1",

		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "four",
		header: "4",

		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "oneHundredTwentyEight",
		header: "128",

		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "twoHundredFiftySix",
		header: "256",

		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
];

export const productEnterpriseBenchmarkThroughputColumns: ColumnDef<
	Record<string, unknown>,
	unknown
>[] = [
	{
		accessorKey: "completionTimeAndThroughput",
		header: "Completion Time & Throughput",
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "value",
		header: "",
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
];

export const productEnterpriseBenchmarkCacheHitRateColumns: ColumnDef<
	Record<string, unknown>,
	unknown
>[] = [
	{
		accessorKey: "cacheHitRateMoreIsBetter",
		header: "Cache Hit Rate (More is Better)",
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
	{
		accessorKey: "value",
		header: "",
		cell: ({ renderValue }) => {
			return renderValue() as ReactNode;
		},
	},
];
