export const ROUTES = {
	ROOT: "/",
	USER_LOGIN: "/user/login",
	USER_SIGNUP: "/user/signup",
	USER_SIGNUP_VERIFICATION: "/user/signup/verification",
	USER_FORGOT_PASSWORD: "/user/forgot-password",
	USER_RESET_PASSWORD: "/user/reset-password",
	USER_PROFILE: "/user/profile",
	USER_PROFILE_PASSWORD: "/user/profile/password",
	USER_PROFILE_WITHDRAW: "/user/profile/withdraw",

	PRODUCTS_OPEN_SOURCE: "/products/open-source",
	PRODUCTS_ENTERPRISE: "/products/enterprise",
	PRODUCTS_PREMIUM: "/products/premium",
	PRODUCTS_SAAS: "/products/saas",

	SOLUTIONS_AI_LLM: "/solutions/ai-llm",
	SOLUTIONS_KUBERNETES: "/solutions/kubernetes",
	SOLUTIONS_5G_TELCO: "/solutions/5g-telco",
	SOLUTIONS_EDGE_COMPUTING: "/solutions/edge-computing",

	TECHNOLOGY_FEATURES: "/technology/features",
	TECHNOLOGY_PERFORMANCE: "/technology/performance",

	TRUST_SUCCESS_STORY: "/trust/success-story",
	TRUST_SUCCESS_STORY_DETAIL: "/trust/success-story/:id",

	BUSINESS_PRICING: "/business/pricing",
	BUSINESS_CONTACT: "/business/contact",

	RESOURCE_DOCUMENTATION: "/resource/documentation",
	RESOURCE_BLOG: "/resource/blog",
	RESOURCE_NEWS: "/resource/news",

	LEGAL_PRIVACY: "/legal/privacy",
	LEGAL_TERMS: "/legal/terms",
	LEGAL_COOKIES: "/legal/cookies",
} as const;

export const DIALOGS = {
	LOGIN: "login",
	FORGOT_PASSWORD: "forgot-password",
	USER_PROFILE: "user-profile",
	USER_PROFILE_PASSWORD: "user-profile-password",
	USER_PROFILE_WITHDRAW: "user-profile-withdraw",
} as const;
