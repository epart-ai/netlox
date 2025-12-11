import { ROUTES } from "@/shared/config/routes";

export const NAVIGATION_LIST = [
	{
		label: "Product",
		value: "product",
		children: [
			{
				label: "Enterprise",
				value: "enterprise",
				href: ROUTES.PRODUCTS_ENTERPRISE,
			},
			{ label: "Premium", value: "premium", href: ROUTES.PRODUCTS_PREMIUM },
			{ label: "SaaS", value: "saas", href: ROUTES.PRODUCTS_SAAS },
			{
				label: "Open Source",
				value: "openSource",
				href: ROUTES.PRODUCTS_OPEN_SOURCE,
			},
		],
	},
	{
		label: "Solutions",
		value: "solutions",
		children: [
			{
				label: "5G & Telco",
				value: "telco5g",
				href: ROUTES.SOLUTIONS_5G_TELCO,
			},
			{
				label: "Kubernetes",
				value: "kubernetes",
				href: ROUTES.SOLUTIONS_KUBERNETES,
			},
			{
				label: "AI/LLM Workloads",
				value: "aiLlm",
				href: ROUTES.SOLUTIONS_AI_LLM,
			},
			{
				label: "Edge Computing",
				value: "edgeComputing",
				href: ROUTES.SOLUTIONS_EDGE_COMPUTING,
			},
		],
	},
	{
		label: "Technology",
		value: "technology",
		children: [
			{
				label: "Features",
				value: "features",
				href: ROUTES.TECHNOLOGY_FEATURES,
			},
			{
				label: "Performance",
				value: "performance",
				href: ROUTES.TECHNOLOGY_PERFORMANCE,
			},
		],
	},
	{
		label: "Trust",
		value: "trust",
		href: ROUTES.TRUST_SUCCESS_STORY,
		children: [
			{
				label: "Success Story",
				value: "successStory",
				href: ROUTES.TRUST_SUCCESS_STORY,
			},
		],
	},
	{
		label: "Business",
		value: "business",
		children: [
			{ label: "Pricing", value: "pricing", href: ROUTES.BUSINESS_PRICING },
			{ label: "Contact", value: "contact", href: ROUTES.BUSINESS_CONTACT },
		],
	},
	{
		label: "Resource",
		value: "resource",
		children: [
			{
				label: "Documentation",
				value: "documentation",
				href: ROUTES.RESOURCE_DOCUMENTATION,
			},
			{ label: "Blog", value: "blog", href: ROUTES.RESOURCE_BLOG },
			{ label: "News", value: "news", href: ROUTES.RESOURCE_NEWS },
		],
	},
];
