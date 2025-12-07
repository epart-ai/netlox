import { DataTable, Reveal } from "@/shared/ui/display";
import {
	productEnterpriseBenchmarkCacheHitRateColumns,
	productEnterpriseBenchmarkThroughputColumns,
} from "@/views/products/enterprise/model/productEnterpriseBenchmarksColumns";
import {
	enterpriseParagraphLead,
	enterpriseSectionTitle,
} from "@/views/products/enterprise/styles/snippets";

export const ProductsEnterpriseBenchmarksChwbl = () => {
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
				<span className="text-green-20">
					31% Faster | 45% Higher Throughput
				</span>
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
	return (
		<Reveal>
			<h3 className={enterpriseSectionTitle}>AI/LLM Workload Optimization</h3>
			<p className={enterpriseParagraphLead}>
				LoxiLB&apos;s intelligent GPU-aware algorithm (CHWBL) doubles cache hit
				rates, leading to 31% faster completion and 45% higher throughput for
				AI/LLM tasks.
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
	);
};
