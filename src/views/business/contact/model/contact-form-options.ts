export const ROLE_VALUES = [
	"",
	"engineer",
	"architect",
	"manager",
	"c_level",
	"other",
] as const;

export type RoleValue = (typeof ROLE_VALUES)[number];

export const ROLE_OPTIONS: Array<{ value: RoleValue; label: string }> = [
	{ value: "engineer", label: "Engineer" },
	{ value: "architect", label: "Architect" },
	{ value: "manager", label: "Manager" },
	{ value: "c_level", label: "C-level" },
];

export const HELP_VALUES = ["", "demo", "technical", "pricing"] as const;

export type HelpValue = (typeof HELP_VALUES)[number];

export const HELP_OPTIONS: Array<{ value: HelpValue; label: string }> = [
	{ value: "demo", label: "Request a Demo" },
	{ value: "technical", label: "Technical Question" },
	{ value: "pricing", label: "Pricing/Quote Request" },
];

export const PRIMARY_USE_CASE_VALUES = [
	"",
	"kubernetes_lb",
	"ai_ml_inference",
	"telco_5g",
	"other",
] as const;

export type PrimaryUseCaseValue = (typeof PRIMARY_USE_CASE_VALUES)[number];

export const PRIMARY_USE_CASE_OPTIONS: Array<{
	value: PrimaryUseCaseValue;
	label: string;
}> = [
	{ value: "kubernetes_lb", label: "Kubernetes Load Balancing" },
	{ value: "ai_ml_inference", label: "AI/ML Inference" },
	{ value: "telco_5g", label: "5G/Telco Applications" },
	{ value: "other", label: "기타" },
];

export const HOW_TO_KNOW_US_VALUES = [
	"",
	"search",
	"github",
	"cncf",
	"referral",
	"other",
] as const;

export type HowToKnowUsValue = (typeof HOW_TO_KNOW_US_VALUES)[number];

export const HOW_TO_KNOW_US_OPTIONS: Array<{
	value: HowToKnowUsValue;
	label: string;
}> = [
	{ value: "search", label: "Goog le Se arc h" },
	{ value: "github", label: "G it Hub" },
	{ value: "cncf", label: "CNCF" },
	{ value: "referral", label: "R e f e rra l" },
	{ value: "other", label: "기타" },
];
