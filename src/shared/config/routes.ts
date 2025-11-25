export const ROUTES = {
	ROOT: "/",
	USER_LOGIN: "/user/login",
	USER_SIGNUP: "/user/signup",
	USER_SIGNUP_SUCCESS: "/user/signup/success",
	USER_FORGOT_PASSWORD: "/user/forgot-password",
	USER_RESET_PASSWORD: "/user/reset-password",
	COOKIE_POLICY: "/cookie-policy",

	PRODUCTS_OPEN_SOURCE: "/products/open-source",
	PRODUCTS_ENTERPRISE: "/products/enterprise",
	PRODUCTS_PREMIUM: "/products/premium",
	PRODUCTS_SAAS: "/products/saas",

	SOLUTIONS_AI_LLM: "/solutions/ai-llm",
	SOLUTIONS_KUBERNETES: "/solutions/kubernetes",
	SOLUTIONS_TELCO_5G: "/solutions/telco-5g",
	SOLUTIONS_EDGE_COMPUTING: "/solutions/edge-computing",

	TECHNOLOGY_FEATURES: "/technology/features",
	TECHNOLOGY_PERFORMANCE: "/technology/performance",

	TRUST_SUCCESS_STORY: "/trust/success-story",

	BUSINESS_PRICING: "/business/pricing",
	BUSINESS_CONTACT: "/business/contact",

	RESOURCE_DOCUMENTATION: "/resource/documentation",
	RESOURCE_BLOG: "/resource/blog",
	RESOURCE_NEWS: "/resource/news",
} as const;

export const DIALOGS = {
	LOGIN: "login",
	FORGOT_PASSWORD: "forgot-password",
} as const;
