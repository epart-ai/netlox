import {
	SolutionsEdgeComputingChallenge,
	SolutionsEdgeComputingHead,
	SolutionsEdgeComputingLoxilb,
} from "@/views/solutions/edge-computing/ui";

export default function SolutionsEdgeComputingPage() {
	const themeColor = "orange";

	return (
		<>
			<SolutionsEdgeComputingHead themeColor={themeColor} />
			<div className="mt-10 lg:mt-20">
				<SolutionsEdgeComputingChallenge themeColor={themeColor} />
			</div>
			<div className="mt-15 lg:mt-[108px]">
				<SolutionsEdgeComputingLoxilb themeColor={themeColor} />
			</div>
		</>
	);
}
