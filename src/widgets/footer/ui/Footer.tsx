import Image from "next/image";

import { ROUTES } from "@/shared/config";
import { TextLink } from "@/shared/ui/navigation";
import TopButton from "@/widgets/footer/ui/TopButton";

import { FooterCtaBanner } from "./FooterCtaBanner";

export const Footer = () => {
	const footerSections = [
		{
			title: "PRODUCT",
			links: [
				{ label: "Enterprise", href: ROUTES.PRODUCTS_ENTERPRISE },
				{ label: "Premium", href: ROUTES.PRODUCTS_PREMIUM },
				{ label: "SaaS", href: ROUTES.PRODUCTS_SAAS },
				{ label: "Open Source", href: ROUTES.PRODUCTS_OPEN_SOURCE },
			],
		},
		{
			title: "SOLUTIONS",
			links: [
				{ label: "AI/LLM", href: ROUTES.SOLUTIONS_AI_LLM },
				{ label: "Kubernetes", href: ROUTES.SOLUTIONS_KUBERNETES },
				{ label: "5G&Telco", href: ROUTES.SOLUTIONS_5G_TELCO },
				{ label: "Edge Computing", href: ROUTES.SOLUTIONS_EDGE_COMPUTING },
			],
		},
		{
			title: "TECHNOLOGY",
			links: [
				{ label: "Features", href: ROUTES.TECHNOLOGY_FEATURES },
				{ label: "Performance", href: ROUTES.TECHNOLOGY_PERFORMANCE },
			],
		},
		{
			title: "TRUST",
			links: [
				{ label: "Overview", href: ROUTES.TRUST_OVERVIEW },
				{ label: "Success Story", href: ROUTES.TRUST_SUCCESS_STORY },
			],
		},
		{
			title: "BUSINESS",
			links: [
				{ label: "Pricing", href: ROUTES.BUSINESS_PRICING },
				{ label: "Contact", href: ROUTES.BUSINESS_CONTACT },
			],
		},
		{
			title: "RESOURCE",
			links: [
				{ label: "Documentation", href: ROUTES.RESOURCE_DOCUMENTATION },
				{ label: "Blog", href: ROUTES.RESOURCE_BLOG },
			],
		},
	];

	return (
		<>
			<FooterCtaBanner />
			<TopButton />
			<footer id="site-footer" className="bg-blue-100 pt-15 shadow-y-1">
				<div className="wrapper pb-20">
					<div className="flex flex-col justify-between gap-10 lg:flex-row lg:gap-0">
						<div className="flex flex-col items-center gap-5 lg:items-start">
							<Image
								className=""
								alt="NetLOX Logo"
								src="/images/common/logo.svg"
								width={180}
								height={20}
							/>
							<p className="paragraph-14">
								The eBPF-powered load balancer <br />
								for cloud-native workloads.
							</p>
						</div>
						<nav className="" aria-label="Footer Navigation">
							<ul className="flex flex-col flex-wrap gap-y-10 sm:flex-row lg:gap-[3vw]">
								{footerSections.map((section) => (
									<li
										key={section.title}
										className="flex flex-col gap-4 text-center sm:w-1/2 md:w-1/3 lg:w-auto"
									>
										<strong className="subTitle-16 mb-2 text-blue-60">
											{section.title}
										</strong>
										{section.links.map((item) => (
											<TextLink
												key={`${section.title}-${item.label}`}
												href={item.href}
												label={item.label}
												size="md"
												colors="white75"
											/>
										))}
									</li>
								))}
							</ul>
						</nav>
					</div>
				</div>
				<div className="border-t border-white/25 p-3.5 text-center">
					<p className="paragraph-14">
						Copyright © 2025 NetLOX. All rights reserved.
					</p>
				</div>
			</footer>
		</>
	);
};
