import dynamic from "next/dynamic";

import type { DataChartProps } from "@/shared/ui/display";
import { DataTable, Reveal } from "@/shared/ui/display";
import type { ChartConfig } from "@/shared/ui/shadcn/chart";
import { productEnterpriseBenchmarkConnectionsColumns } from "@/views/products/enterprise/model/productEnterpriseBenchmarksColumns";
import {
	enterpriseParagraphLead,
	enterpriseSectionTitle,
} from "@/views/products/enterprise/styles/snippets";

const DataChart = dynamic<DataChartProps>(
	() => import("@/shared/ui/display").then((module) => module.DataChart),
	{ ssr: false },
);

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

export const ProductsEnterpriseBenchmarksIngress = () => {
	return (
		<Reveal>
			<h3 className={enterpriseSectionTitle}>
				L7 Ingress HTTPS RPS (vs. NGINX, HAProxy)
			</h3>
			<p className={enterpriseParagraphLead}>
				For L7 Ingress, LoxiLB scales significantly better, handling ~40% more
				requests per second than NGINX at 256 connections.
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
						<linearGradient id="haProxy-gradient" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#09BC4B" stopOpacity={0.5} />
							<stop offset="100%" stopColor="#09BC4B" stopOpacity={0.25} />
						</linearGradient>
						<linearGradient id="loxiLB-gradient" x1="0" y1="0" x2="0" y2="1">
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
	);
};
