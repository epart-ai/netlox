import Image from "next/image";

import { NAVIGATION_LIST } from "@/shared/config";
import { logoWidth } from "@/shared/styles/snippets";
import { TextLink } from "@/shared/ui/navigation";
import TopButton from "@/widgets/footer/ui/TopButton";

import { FooterCtaBanner } from "./FooterCtaBanner";

export const Footer = () => {
	return (
		<>
			<FooterCtaBanner />
			<TopButton />
			<footer id="site-footer" className="bg-blue-100 pt-8 shadow-y-1 lg:pt-15">
				<div className="wrapper pb-10 lg:pb-20">
					<div className="flex flex-col justify-between gap-6 lg:flex-row lg:gap-10">
						<div className="flex flex-col items-center gap-3 lg:items-start lg:gap-5">
							<Image
								className={logoWidth}
								alt="NetLOX Logo"
								src="/images/common/logo.svg"
								width={180}
								height={20}
							/>
							<div className="paragraph-12 px-5 text-center lg:paragraph-14 lg:px-0 lg:text-left">
								<p>
									The eBPF-powered load balancer{" "}
									<br className="hidden lg:block" />
									for cloud-native workloads.
								</p>

								<div className="mt-4 lg:mt-8">
									<strong className="title-12 uppercase lg:title-14">
										Address
									</strong>
									<p className="mt-1 lg:mt-2.5">
										Unit 1209, Hybrand, 16 Maeheon-ro,
										<br className="hidden lg:block" />
										Seocho-gu, Seoul, South Korea
									</p>
								</div>
							</div>
						</div>
						<nav className="" aria-label="Footer Navigation">
							<ul className="flex flex-col flex-wrap gap-y-6 sm:flex-row lg:gap-[3vw] lg:gap-y-10">
								{NAVIGATION_LIST.map((item) => (
									<li
										key={item.label}
										className="flex flex-col items-center gap-2 text-center sm:w-1/2 md:w-1/3 lg:w-auto lg:items-start lg:gap-4"
									>
										<strong className="title-14 mb-2 text-blue-60 lg:title-16">
											{item.label}
										</strong>
										{item.children.map((child) => (
											<TextLink
												key={`${item.label}-${child.label}`}
												href={child.href}
												label={child.label}
												className="lg:paragraph-16"
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
					<p className="paragraph-12 lg:paragraph-14">
						Copyright © 2025 NetLOX. All rights reserved.
					</p>
				</div>
			</footer>
		</>
	);
};
