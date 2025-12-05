import dynamic from "next/dynamic";

import type { ThemeColor } from "@/shared/model/types";
import type { DataChartProps } from "@/shared/ui/display";
import { DataTable, Reveal } from "@/shared/ui/display";
import type { ChartConfig } from "@/shared/ui/shadcn/chart";
import { PageHead } from "@/views/_shared/ui/PageHead";
import {
	productEnterpriseBenchmarkCacheHitRateColumns,
	productEnterpriseBenchmarkConnectionsColumns,
	productEnterpriseBenchmarkDifferentNodeColumns,
	productEnterpriseBenchmarkSameNodeColumns,
	productEnterpriseBenchmarkThroughputColumns,
} from "@/views/products/enterprise/model/productEnterpriseBenchmarksColumns";
import {
	enterpriseParagraphLead,
	enterpriseSectionTitle,
} from "@/views/products/enterprise/styles/snippets";

interface Props {
	themeColor?: ThemeColor;
}

const DataChart = dynamic<DataChartProps>(
	() => import("@/shared/ui/display").then((module) => module.DataChart),
	{ ssr: false },
);

const throughputChartData: {
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

const throughputChartConfig: ChartConfig = {
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

const ingressChartData: {
	name: string;
	nginx: number;
	haProxy: number;
	loxiLB: number;
}[] = [
	{
		name: "1 connection",
		nginx: 1034.72,
		haProxy: 1028.75,
		loxiLB: 1974.02,
	},
	{
		name: "8 connections",
		nginx: 4191.12,
		haProxy: 4602.65,
		loxiLB: 6043.87,
	},
	{
		name: "128 connections",
		nginx: 24285.89,
		haProxy: 33081.87,
		loxiLB: 36075.64,
	},
	{
		name: "256 connections",
		nginx: 29225.91,
		haProxy: 36141.38,
		loxiLB: 40904.8,
	},
];

const ingressChartConfig: ChartConfig = {
	nginx: {
		label: "NGINX",
		color: "url(#nginx-gradient)",
	},
	haProxy: {
		label: "HAProxy",
		color: "url(#haProxy-gradient)",
	},
	loxiLB: {
		label: "LoxiLB - Ingress",
		color: "url(#loxiLB-gradient)",
	},
};

const connectionsData = [
	{
		connections: "NGINX",
		one: "1034.72",
		four: "4191.12",
		oneHundredTwentyEight: "24285.89",
		twoHundredFiftySix: "29225.91",
	},
	{
		connections: "HAProxy",
		one: "1028.75",
		four: "4602.65",
		oneHundredTwentyEight: "33081.87",
		twoHundredFiftySix: "36141.38",
	},
	{
		connections: <span className="text-green-20">LoxiLB Ingress</span>,
		one: <span className="text-green-20">1974.02</span>,
		four: <span className="text-green-20">6043.87</span>,
		oneHundredTwentyEight: <span className="text-green-20">36075.64</span>,
		twoHundredFiftySix: <span className="text-green-20">40904.8</span>,
	},
];

const throughputData = [
	{
		completionTimeAndThroughput: "Round-Robin (Standard)",
		value: "Standard",
	},
	{
		completionTimeAndThroughput: (
			<span className="text-green-20">LoxiLB (CHWBL)</span>
		),
		value: (
			<span className="text-green-20">31% Faster | 45% Higher Throughput</span>
		),
	},
];

const cacheHitRateData = [
	{
		cacheHitRateMoreIsBetter: "Round-Robin (Standard)",
		value: "38%",
	},
	{
		cacheHitRateMoreIsBetter: (
			<span className="text-green-20">LoxiLB (CHWBL)</span>
		),
		value: <span className="text-green-20">76% (2x Improvement)</span>,
	},
];

export const ProductsEnterpriseBenchmarks = ({ themeColor }: Props) => {
	return (
		<>
			<Reveal>
				<PageHead
					theme={themeColor}
					title="Enterprise Performance Benchmarks"
					description={
						<>
							See how LoxiLB&apos;s eBPF data plane delivers superior throughput
							and latency compared to <br />
							common alternatives like MetalLB, NGINX, and HAProxy.
						</>
					}
				/>
			</Reveal>
			<div className="mt-[80px]">
				<Reveal>
					<h3 className={enterpriseSectionTitle}>
						L4 LoadBalancer Throughput (vs. MetalLB)
					</h3>
					<p className={enterpriseParagraphLead}>
						In pod-to-pod communication on different nodes, LoxiLB achieves over
						3.5x higher throughput (32.5 Gbps) compared to MetalLB (9.14 Gbps).
					</p>
					<div className="grid gap-10 lg:grid-cols-2">
						<DataChart
							className="row-span-2 min-h-[320px] w-full md:min-h-[360px]"
							data={throughputChartData}
							config={throughputChartConfig}
							bars={[{ dataKey: "metalLB" }, { dataKey: "loxiLB" }]}
							groupLabel={{
								"0": "(POD ON SAME NODE)",
								"2": "(POD ON DIFFERENT NODE)",
							}}
							yAxisDomain={[0, 80]}
							yAxisTicks={[0, 10, 20, 30, 40, 50, 60, 70, 80]}
						>
							<defs>
								<linearGradient
									id="loxiLB-gradient"
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop offset="0%" stopColor="#2563EB" stopOpacity={1} />
									<stop offset="100%" stopColor="#2563EB" stopOpacity={0.75} />
								</linearGradient>
								<linearGradient
									id="metalLB-gradient"
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
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
			</div>
			<div className="mt-14 lg:mt-[100px]">
				<Reveal>
					<h3 className={enterpriseSectionTitle}>
						L7 Ingress HTTPS RPS (vs. NGINX, HAProxy)
					</h3>
					<p className={enterpriseParagraphLead}>
						For L7 Ingress, LoxiLB scales significantly better, handling ~40%
						more requests per second than NGINX at 256 connections.
					</p>
					<div className="grid items-start gap-10 lg:grid-cols-2">
						<DataChart
							className="min-h-[320px] w-full md:min-h-[360px]"
							data={ingressChartData}
							config={ingressChartConfig}
							bars={[
								{ dataKey: "nginx" },
								{ dataKey: "haProxy" },
								{ dataKey: "loxiLB" },
							]}
							yAxisDomain={[0, 45000]}
							yAxisTicks={[
								0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000,
							]}
						>
							<defs>
								<linearGradient id="nginx-gradient" x1="0" y1="0" x2="0" y2="1">
									<stop offset="0%" stopColor="#FF9319" stopOpacity={0.5} />
									<stop offset="100%" stopColor="#FF9319" stopOpacity={0.25} />
								</linearGradient>
								<linearGradient
									id="haProxy-gradient"
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop offset="0%" stopColor="#09BC4B" stopOpacity={0.5} />
									<stop offset="100%" stopColor="#09BC4B" stopOpacity={0.25} />
								</linearGradient>
								<linearGradient
									id="loxiLB-gradient"
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop offset="0%" stopColor="#2563EB" stopOpacity={1} />
									<stop offset="100%" stopColor="#2563EB" stopOpacity={0.75} />
								</linearGradient>
							</defs>
						</DataChart>
						<DataTable
							data={connectionsData}
							columns={productEnterpriseBenchmarkConnectionsColumns}
						/>
					</div>
				</Reveal>
			</div>
			<div className="mt-14 lg:mt-[100px]">
				<Reveal>
					<h3 className={enterpriseSectionTitle}>
						AI/LLM Workload Optimization
					</h3>
					<p className={enterpriseParagraphLead}>
						LoxiLB&apos;s intelligent GPU-aware algorithm (CHWBL) doubles cache
						hit rates, leading to 31% faster completion and 45% higher
						throughput for AI/LLM tasks.
					</p>
					<div className="grid gap-10 lg:grid-cols-2">
						<DataTable
							data={throughputData}
							columns={productEnterpriseBenchmarkThroughputColumns}
						/>
						<DataTable
							data={cacheHitRateData}
							columns={productEnterpriseBenchmarkCacheHitRateColumns}
						/>
					</div>
				</Reveal>
			</div>
		</>
	);
};
