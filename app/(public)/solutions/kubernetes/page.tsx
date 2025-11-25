import {
	SolutionsKubernetesCard,
	SolutionsKubernetesIntro,
} from "@/views/solutions/kubernetes/ui";

export default function ProductOpenSourcePage() {
	const themeColor = "blue";

	return (
		<>
			<SolutionsKubernetesIntro themeColor={themeColor} />
			<SolutionsKubernetesCard themeColor={themeColor} />
		</>
	);
}
