import Link from "next/link";
import { Fragment } from "react";

import { ROUTES } from "@/shared/config";
import { Reveal } from "@/shared/ui/display";
import { Button, ButtonBox } from "@/shared/ui/shadcn/button";
import { Separator } from "@/shared/ui/shadcn/separator";

export const RootHero = () => {
	const trustedBy = [
		{
			name: "Global Top 3 Electronics",
		},
		{
			name: "Fortune 100 Software",
		},
		{
			name: "CNCF",
		},
	];
	return (
		<section className="relative">
			<video
				playsInline={true}
				className="h-[100dvh] w-full object-cover"
				autoPlay={true}
				muted={true}
				loop={true}
				aria-label="Video Pause"
				preload="metadata"
				tabIndex={0}
			>
				<source
					src="/videos/main/hero.mov"
					media="(max-width: 600px)"
					type="video/mp4"
				/>
				<source
					src="/videos/main/hero.mov"
					media="(min-width: 601px)"
					type="video/mp4"
				/>
			</video>
			<div className="h-full w-full bg-[linear-gradient(180deg,rgba(2,6,23,0.00)_0%,#020617_100%)] absolute-center">
				<div className="wrapper h-full pt-header">
					<div className="flex h-full w-full flex-col items-center justify-center gap-7">
						<Reveal>
							<h2 className="title-40 text-center md:title-60 lg:title-80">
								10× Faster Load Balancer
								<span className="block text-blue-60">Than MetalLB</span>
							</h2>
						</Reveal>
						<Reveal>
							<p className="paragraph-16 text-center md:paragraph-20 lg:paragraph-24">
								eBPF-powered, independently benchmarked, and trusted by Fortune
								<br />
								500 companies for mission-critical workloads.
							</p>
						</Reveal>
						<Reveal delayMs={450}>
							<ButtonBox className="mt-4">
								<Button asChild>
									<Link href={ROUTES.BUSINESS_CONTACT}>
										<span>Request Enterprise Demo</span>
									</Link>
								</Button>
								<Button asChild variant="secondary">
									<Link href={ROUTES.TECHNOLOGY_PERFORMANCE}>
										<span>View Performance</span>
									</Link>
								</Button>
							</ButtonBox>
						</Reveal>
						<Reveal delayMs={450}>
							<dl className="paragraph-14 flex gap-2.5 lg:paragraph-16 lg:flex-row">
								<dt className="mr-7 opacity-50">Trusted by</dt>
								<div className="flex flex-col gap-3.5 md:flex-row md:items-center">
									{trustedBy.map((item, index) => (
										<Fragment key={item.name}>
											{index > 0 && (
												<Separator
													orientation="vertical"
													opacity="50"
													className="hidden h-2 md:block"
												/>
											)}
											<dd className="">{item.name}</dd>
										</Fragment>
									))}
								</div>
							</dl>
						</Reveal>
					</div>
				</div>
			</div>
		</section>
	);
};
