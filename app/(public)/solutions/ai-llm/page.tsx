import {
	SolutionsAiLlmChallenge,
	SolutionsAiLlmHead,
	SolutionsAiLlmLoxilb,
} from "@/views/solutions/ai-llm/ui";

export default function SolutionsAiLlmPage() {
	const themeColor = "green";

	return (
		<>
			<SolutionsAiLlmHead themeColor={themeColor} />
			<div className="mt-20">
				<SolutionsAiLlmChallenge themeColor={themeColor} />
			</div>
			<div className="mt-[108px]">
				<SolutionsAiLlmLoxilb themeColor={themeColor} />
			</div>
		</>
	);
}
