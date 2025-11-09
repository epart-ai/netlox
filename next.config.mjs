/** @type {import('next').NextConfig} */
const nextConfig = {
	// Use default page extensions for both App Router and Pages Router
	pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
	experimental: {
		turbo: {
			rules: {
				"*.svg": {
					loaders: ["@svgr/webpack"],
					as: "*.js",
				},
			},
		},
	},
	async headers() {
		const isProd = process.env.NODE_ENV === "production";
		const scriptSrc = ["'self'", "'unsafe-inline'"];
		if (!isProd) {
			// 개발 모드에서 React Refresh 등 일부 도구가 eval 사용
			scriptSrc.push("'unsafe-eval'");
		}
		const csp = [
			"default-src 'self'",
			"img-src 'self' https: data: blob:",
			"style-src 'self' 'unsafe-inline'",
			`script-src ${scriptSrc.join(" ")}`,
			"font-src 'self' data:",
			"connect-src 'self' https:",
			"frame-ancestors 'none'",
		].join("; ");
		return [
			{
				source: "/(.*)",
				headers: [
					{ key: "X-Frame-Options", value: "DENY" },
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
					},
					{
						key: "Content-Security-Policy",
						value: csp,
					},
				],
			},
		];
	},
};

export default nextConfig;
