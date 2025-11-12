import Image from "next/image";

import { BackgroundImage } from "@/shared/ui/display";
import { Button, ButtonBox } from "@/shared/ui/shadcn";

export const Footer = () => {
	const footerSections = [
		{
			title: "PRODUCT",
			links: ["Enterprise", "Premium", "SaaS", "Open Source"],
		},
		{
			title: "SOLUTIONS",
			links: ["AI/LLM", "Kubernetes", "5G&Telco", "Edge Computing"],
		},
		{
			title: "TECHNOLOGY",
			links: ["Features", "Performance"],
		},
		{
			title: "TRUST",
			links: ["Success Story"],
		},
		{
			title: "BUSINESS",
			links: ["Pricing", "Contact"],
		},
		{
			title: "RESOURCE",
			links: ["Documentation", "Blog"],
		},
	];

	return (
		<>
			<div className="bg-gradient-to-b from-blue-100/15 to-blue-20/15">
				<div className="wrapper py-15 md:py-25 lg:py-40">
					<div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-blue-10 to-blue-20 px-4 py-10 lg:py-20">
						<BackgroundImage
							opacity="50"
							className="z-0 mix-blend-multiply"
							src="/images/common/bg_banner.png"
						/>

						<div className="text-center">
							<strong className="title-36 lg:title-44">
								Ready to 10× Your Performance?
							</strong>

							<p className="paragraph-16 mt-4 lg:paragraph-18 lg:mt-8">
								Get in touch with our engineers <br />
								or request a live demo to see NetLOX in action.
							</p>
							<ButtonBox className="mt-7 lg:mt-15">
								<Button variant="white">Request Demo</Button>
								<Button variant="secondary">Contact Sales</Button>
							</ButtonBox>
						</div>
					</div>
				</div>
			</div>
			<footer className="bg-black pt-15 shadow-y-1">
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
										<strong className="subTitle-16 mb-2 text-blue-20">
											{section.title}
										</strong>
										{section.links.map((link) => (
											<a
												key={`${section.title}-${link}`}
												href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
												className="paragraph-16"
											>
												{link}
											</a>
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
