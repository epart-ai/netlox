export const ROLE_VALUES = {
	technical_engineer: "Technical / Engineer",
	devops_sre: "DevOps / SRE",
	ai_ml: "AI / ML",
	product_manager: "Product / Manager",
	business_partner: "Business / Partner",
	research_student: "Research / Student",
	other: "Other",
} as const;

export type RoleValue = keyof typeof ROLE_VALUES;

export const ROLE_OPTIONS: Array<{ value: RoleValue; label: string }> =
	Object.entries(ROLE_VALUES).map(([value, label]) => ({
		value: value as RoleValue,
		label,
	}));

export const HELP_VALUES = {
	demo: "Request a Demo",
	technical: "Technical Question",
	pricing: "Pricing/Quote Request",
	partnership: "Partnership Inquiry",
	general: "General Inquiry",
} as const;

export type HelpValue = keyof typeof HELP_VALUES;

export const HELP_OPTIONS: Array<{ value: HelpValue; label: string }> =
	Object.entries(HELP_VALUES).map(([value, label]) => ({
		value: value as HelpValue,
		label,
	}));

export const PRIMARY_USE_CASE_VALUES = {
	kubernetes_lb: "Kubernetes Load Balancing",
	ai_ml_inference: "AI/ML Inference",
	telco_5g: "5G/Telco Applications",
	edge_computing: "Edge Computing",
	multi_cloud_ha: "Multi-Cloud HA",
	other: "Other",
} as const;

export type PrimaryUseCaseValue = keyof typeof PRIMARY_USE_CASE_VALUES;

export const PRIMARY_USE_CASE_OPTIONS: Array<{
	value: PrimaryUseCaseValue;
	label: string;
}> = Object.entries(PRIMARY_USE_CASE_VALUES).map(([value, label]) => ({
	value: value as PrimaryUseCaseValue,
	label,
}));

export const HOW_TO_KNOW_US_VALUES = {
	search_engine: "Search Engine",
	github_community: "GitHub / Community",
	event_conference: "Event / Conference",
	social_media: "Social Media",
	partner_referral: "Partner / Referral",
	other: "Other",
} as const;

export type HowToKnowUsValue = keyof typeof HOW_TO_KNOW_US_VALUES;

export const HOW_TO_KNOW_US_OPTIONS: Array<{
	value: HowToKnowUsValue;
	label: string;
}> = Object.entries(HOW_TO_KNOW_US_VALUES).map(([value, label]) => ({
	value: value as HowToKnowUsValue,
	label,
}));
