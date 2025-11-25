import {
	SolutionsEdgeComputingCard,
	SolutionsEdgeComputingIntro,
} from "@/views/solutions/edge-computing/ui";

export default function SolutionsEdgeComputingPage() {
	const themeColor = "orange";

	return (
		<>
			<SolutionsEdgeComputingIntro themeColor={themeColor} />
			<SolutionsEdgeComputingCard themeColor={themeColor} />
		</>
	);
}
