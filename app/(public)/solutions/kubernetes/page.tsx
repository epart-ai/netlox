import {
	SolutionsKubernetesHead,
	SolutionsKubernetesLoxilb,
	SolutionsKubernetesTable,
} from "@/views/solutions/kubernetes/ui";

export default function ProductOpenSourcePage() {
	const themeColor = "blue";

	return (
		<>
			<SolutionsKubernetesHead themeColor={themeColor} />
			<div className="mt-20">
				<SolutionsKubernetesTable />
			</div>
			<div className="mt-[108px]">
				<SolutionsKubernetesLoxilb themeColor={themeColor} />
			</div>
		</>
	);
}
