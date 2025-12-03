import { Reveal, StatHighlights } from "@/shared/ui/display";

export const TrustOverviewHighlight = () => {
	const data = [
		{
			highlight: {
				value: 50,
				unit: "+",
			},
			description: "Production Deployments",
		},
		{
			highlight: {
				value: 2000,
				unit: "+",
			},
			description: "GitHub Stars",
		},
		{
			highlight: {
				value: 99.99,
				unit: "%",
			},
			description: "Average Customer Uptime",
		},
		{
			highlight: {
				value: 60,
				unit: "%",
			},
			description: "Average Cost Reduction",
		},
	];
	return (
		<Reveal rootMargin="-25% 0px -25% 0px" threshold={0}>
			<StatHighlights
				items={data}
				showSeparators
				className="justify-between text-center md:px-10 lg:px-20"
			/>
		</Reveal>
	);
};
