import {
	SolutionsAiLlmCard,
	SolutionsAiLlmIntro,
} from "@/views/solutions/ai-llm/ui";

export default function SolutionsAiLlmPage() {
	const themeColor = "green";

	return (
		<>
			<SolutionsAiLlmIntro themeColor={themeColor} />
			<SolutionsAiLlmCard themeColor={themeColor} />
		</>
	);
}
