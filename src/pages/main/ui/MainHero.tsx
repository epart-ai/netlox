import { Fragment } from "react";

import { Button, ButtonBox } from "@/shared/ui";

export const MainHero = () => {
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
		<div className="relative">
			<video
				playsInline={true}
				className="h-[100vh] w-full object-cover"
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
				<div className="wrapper h-full">
					<div className="flex h-full w-full flex-col items-center justify-center gap-7">
						<h1 className="title-40 text-center md:title-60 lg:title-80">
							10× Faster Load Balancer
							<span className="text-blue-20 block">Than MetalLB</span>
						</h1>
						<p className="paragraph-16 text-center md:paragraph-20 lg:paragraph-24">
							eBPF-powered, independently benchmarked, and trusted by Fortune
							<br />
							500 companies for mission-critical workloads.
						</p>

						<ButtonBox className="mt-4">
							<Button variant="primary">Request Enterprise Demo</Button>
							<Button variant="secondary">View Performance</Button>
						</ButtonBox>

						<dl className="paragraph-14 flex gap-2.5 lg:paragraph-16 lg:flex-row">
							<dt className="mr-7 opacity-50">Trusted by</dt>
							<div className="flex flex-col gap-3.5 md:flex-row md:items-center">
								{trustedBy.map((item, index) => (
									<Fragment key={item.name}>
										{index > 0 && (
											<div className="hidden h-2 w-[1px] bg-white/50 md:block" />
										)}
										<dd className="">{item.name}</dd>
									</Fragment>
								))}
							</div>
						</dl>
					</div>
				</div>
			</div>
		</div>
	);
};
