import dynamic from "next/dynamic";

import type { DataChartProps } from "@/shared/ui/display";
import { DataTable, Reveal } from "@/shared/ui/display";
import type { ChartConfig } from "@/shared/ui/shadcn/chart";
import {
	productEnterpriseBenchmarkDifferentNodeColumns,
	productEnterpriseBenchmarkSameNodeColumns,
} from "@/views/products/enterprise/model/productEnterpriseBenchmarksColumns";
import {
	enterpriseParagraphLead,
	enterpriseSectionTitle,
} from "@/views/products/enterprise/styles/snippets";

const DataChart = dynamic<DataChartProps>(
	() => import("@/shared/ui/display").then((module) => module.DataChart),
	{ ssr: false },
);

export const ProductsEnterpriseBenchmarksIncluster = () => {
	const inclusterChartData: {
		name: string;
		metalLB: number;
		loxiLB: number;
	}[] = [
		{
			name: "Same Node (1 conn)",
			metalLB: 16.9,
			loxiLB: 17.6,
		},
		{
			name: "Same Node (8 conn)",
			metalLB: 64.8,
			loxiLB: 72.85,
		},
		{
			name: "Diff Node (1 conn)",
			metalLB: 2.49,
			loxiLB: 11.6,
		},
		{
			name: "Diff Node (8 conn)",
			metalLB: 9.14,
			loxiLB: 32.5,
		},
	];

	const inclusterChartConfig: ChartConfig = {
		metalLB: {
			label: "MetalLB",
			color: "url(#metalLB-gradient)",
		},
		loxiLB: {
			label: "LoxiLB - Incluster",
			color: "url(#loxiLB-gradient)",
		},
	};

	const sameNodeData = [
		{
			podOnSameNodeInGbps: "MetalLB",
			oneConnection: "16.9",
			eightConnections: "64.8",
		},
		{
			podOnSameNodeInGbps: (
				<span className="text-green-20">LoxiLB - Incluster</span>
			),
			oneConnection: <span className="text-green-20">17.6</span>,
			eightConnections: <span className="text-green-20">72.85</span>,
		},
	];

	const differentNodeData = [
		{
			podOnDifferentNodeInGbps: "MetalLB",
			oneConnection: "2.49",
			eightConnections: "9.14",
		},
		{
			podOnDifferentNodeInGbps: (
				<span className="text-green-20">LoxiLB - Incluster</span>
			),
			oneConnection: <span className="text-green-20">11.6</span>,
			eightConnections: <span className="text-green-20">32.5</span>,
		},
	];

	return (
		<Reveal>
			<h3 className={enterpriseSectionTitle}>
				L4 LoadBalancer Incluster (vs. MetalLB)
			</h3>
			<p className={enterpriseParagraphLead}>
				In pod-to-pod communication on different nodes, LoxiLB achieves over
				3.5x higher incluster (32.5 Gbps) compared to MetalLB (9.14 Gbps).
			</p>
			<div className="grid gap-10 lg:grid-cols-2">
				<DataChart
					className="row-span-2 min-h-[320px] w-full md:min-h-[360px]"
					data={inclusterChartData}
					config={inclusterChartConfig}
					bars={[{ dataKey: "metalLB" }, { dataKey: "loxiLB" }]}
					groupLabel={{
						"0": "(POD ON SAME NODE)",
						"2": "(POD ON DIFFERENT NODE)",
					}}
					yAxisDomain={[0, 80]}
					yAxisTicks={[0, 10, 20, 30, 40, 50, 60, 70, 80]}
				>
					<defs>
						<linearGradient id="loxiLB-gradient" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#2563EB" stopOpacity={1} />
							<stop offset="100%" stopColor="#2563EB" stopOpacity={0.75} />
						</linearGradient>
						<linearGradient id="metalLB-gradient" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#09BC4B" stopOpacity={0.5} />
							<stop offset="100%" stopColor="#09BC4B" stopOpacity={0.25} />
						</linearGradient>
					</defs>
				</DataChart>
				<DataTable
					data={sameNodeData}
					columns={productEnterpriseBenchmarkSameNodeColumns}
				/>
				<DataTable
					data={differentNodeData}
					columns={productEnterpriseBenchmarkDifferentNodeColumns}
				/>
			</div>
		</Reveal>
	);
};
