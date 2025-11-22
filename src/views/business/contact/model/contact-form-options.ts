export const ROLE_VALUES = [
	"",
	"product_manager",
	"engineering_lead",
	"cto",
	"other",
] as const;

export type RoleValue = (typeof ROLE_VALUES)[number];

export const ROLE_OPTIONS: Array<{ value: RoleValue; label: string }> = [
	{ value: "product_manager", label: "Product Manager" },
	{ value: "engineering_lead", label: "Engineering Lead" },
	{ value: "cto", label: "CTO" },
	{ value: "other", label: "Other" },
];

export const HELP_VALUES = [
	"",
	"evaluation",
	"integration",
	"pricing",
	"other",
] as const;

export type HelpValue = (typeof HELP_VALUES)[number];

export const HELP_OPTIONS: Array<{ value: HelpValue; label: string }> = [
	{ value: "evaluation", label: "제품 평가 및 데모" },
	{ value: "integration", label: "시스템 연동 상담" },
	{ value: "pricing", label: "가격 및 플랜 문의" },
	{ value: "other", label: "기타 문의" },
];

export const PRIMARY_USE_CASE_VALUES = [
	"",
	"streaming",
	"analytics",
	"internal_tool",
	"other",
] as const;

export type PrimaryUseCaseValue = (typeof PRIMARY_USE_CASE_VALUES)[number];

export const PRIMARY_USE_CASE_OPTIONS: Array<{
	value: PrimaryUseCaseValue;
	label: string;
}> = [
	{ value: "streaming", label: "콘텐츠 스트리밍" },
	{ value: "analytics", label: "데이터 분석" },
	{ value: "internal_tool", label: "내부 업무 시스템" },
	{ value: "other", label: "기타" },
];

export const HOW_TO_KNOW_US_VALUES = [
	"",
	"search",
	"sns",
	"event",
	"recommendation",
	"other",
] as const;

export type HowToKnowUsValue = (typeof HOW_TO_KNOW_US_VALUES)[number];

export const HOW_TO_KNOW_US_OPTIONS: Array<{
	value: HowToKnowUsValue;
	label: string;
}> = [
	{ value: "search", label: "검색 엔진" },
	{ value: "sns", label: "SNS / 커뮤니티" },
	{ value: "event", label: "행사 / 컨퍼런스" },
	{ value: "recommendation", label: "지인 / 파트너 추천" },
	{ value: "other", label: "기타" },
];
