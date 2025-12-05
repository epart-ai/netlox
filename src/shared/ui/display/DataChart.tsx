"use client";

import { useEffect, useRef, useState } from "react";

import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	XAxis,
	YAxis,
} from "recharts";

import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/shadcn/card";
import type { ChartConfig } from "@/shared/ui/shadcn/chart";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
} from "@/shared/ui/shadcn/chart";

interface BarDefinition {
	dataKey: string;
	radius?: number;
	barSize?: number;
	fill?: string;
}

interface Props {
	className?: string;
	config: ChartConfig;
	data: Array<Record<string, unknown>>;
	xDataKey?: string;
	bars: BarDefinition[];
	children?: React.ReactNode;
	groupLabel?: Record<string, string>;
	yAxisDomain?: [number, number];
	yAxisTicks?: number[];
}

export const DataChart = ({
	className,
	config,
	data,
	xDataKey = "name",
	bars,
	groupLabel,
	children,
	yAxisDomain,
	yAxisTicks,
}: Props) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const animationTriggeredRef = useRef(false);
	const [shouldRender, setShouldRender] = useState(false);
	const [chartWidth, setChartWidth] = useState(0);

	useEffect(() => {
		const node = containerRef.current;

		if (!node) {
			return undefined;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.intersectionRatio >= 0.2 && !animationTriggeredRef.current) {
					animationTriggeredRef.current = true;
					setShouldRender(true);
					observer.disconnect();
				}
			},
			{
				threshold: [0, 0.2, 0.5, 1],
				rootMargin: "0px",
			},
		);

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				setChartWidth(entry.contentRect.width);
			}
		});

		observer.observe(node);
		resizeObserver.observe(node);

		return () => {
			observer.disconnect();
			resizeObserver.disconnect();
		};
	}, []);

	const yAxisWidth = 40;
	const plotWidth = Math.max(0, chartWidth - yAxisWidth);
	const step = data.length > 0 ? plotWidth / data.length : 0;
	const groupLabelShift = step / 2;

	const formatYAxisTick = (value: number) => {
		if (value === 0) {
			return "0";
		}
		// 천 단위로 나누고 점(.)을 붙여서 표시
		const thousands = value / 1000;
		return `${thousands}.`;
	};

	return (
		<Card ref={containerRef} className={cn("w-full", className)}>
			{shouldRender && (
				<ChartContainer config={config} className="-mb-3 h-full w-full pt-4">
					<BarChart
						data={data}
						margin={{ top: 24, right: 0, left: -8, bottom: 0 }}
						barGap={16}
					>
						<ChartLegend
							className="absolute left-0 top-0"
							verticalAlign="top"
							align="left"
							content={<ChartLegendContent />}
						/>
						{children}
						<CartesianGrid
							stroke="rgba(255, 255, 255, 0.15)"
							vertical={false}
						/>
						<XAxis
							dataKey={xDataKey}
							axisLine={false}
							tickLine={false}
							height={60}
							interval={0}
							tick={({ x, y, index }) => {
								const isEven = index % 2 === 0;
								const label = isEven ? "1 connection" : "8 connections";
								const currentGroupLabel = groupLabel?.[index] ?? null;

								return (
									<g transform={`translate(${x},${y})`}>
										<text
											x={0}
											y={0}
											dy={16}
											textAnchor="middle"
											fill="#ffffff"
											fontSize={12}
											opacity={0.75}
										>
											{label}
										</text>
										{currentGroupLabel && (
											<text
												x={0}
												y={0}
												dx={groupLabelShift}
												dy={36}
												textAnchor="middle"
												fill="#ffffff"
												fontSize={12}
												opacity={0.5}
											>
												{currentGroupLabel}
											</text>
										)}
									</g>
								);
							}}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tick={({ x, y, payload }) => {
								return (
									<text
										x={x}
										y={y}
										textAnchor="end"
										fill="#ffffff"
										fontSize={12}
										opacity={0.5}
									>
										{formatYAxisTick(payload.value as number)}
									</text>
								);
							}}
							width={40}
							domain={yAxisDomain}
							ticks={yAxisTicks}
						/>
						{bars.map((bar) => (
							<Bar
								key={bar.dataKey}
								dataKey={bar.dataKey}
								fill={`var(--color-${bar.dataKey})`}
								radius={bar.radius ?? 4}
								barSize={bar.barSize ?? 24}
								animationDuration={1500}
								animationBegin={0}
							>
								<LabelList
									dataKey={bar.dataKey}
									position="top"
									offset={4}
									className="fill-foreground"
									fontSize={10}
									fill={`var(--color-${bar.dataKey})`}
								/>
							</Bar>
						))}
					</BarChart>
				</ChartContainer>
			)}
		</Card>
	);
};

export type DataChartProps = Props;
