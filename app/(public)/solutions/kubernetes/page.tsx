import {
	SolutionsKubernetesBenchmarks,
	SolutionsKubernetesHead,
	SolutionsKubernetesLoxilb,
} from "@/views/solutions/kubernetes/ui";

export default function ProductOpenSourcePage() {
	return (
		<>
			<SolutionsKubernetesHead />
			<div className="mt-10 lg:mt-20">
				<SolutionsKubernetesBenchmarks />
			</div>
			<div className="mt-15 lg:mt-[108px]">
				<SolutionsKubernetesLoxilb />
			</div>
		</>
	);
}
