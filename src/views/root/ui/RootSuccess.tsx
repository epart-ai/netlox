import { Fragment } from "react";

import { BackgroundImage, Reveal } from "@/shared/ui/display";
import { Button, ButtonBox } from "@/shared/ui/shadcn/button";
import { Separator } from "@/shared/ui/shadcn/separator";

import { RootSectionLayout } from "./RootSectionLayout";

export const RootSuccess = () => {
	const data = [
		{
			subTitle: "10×",
			title: "Performance Improvement",
			description:
				"Global Electronics Leader reduced load balancer costs by 60% and achieved 10x performance.",
		},
		{
			subTitle: "<1ms",
			title: "Latency for AI Workloads",
			description:
				"Fortune 100 Software Company handles millions of AI inference requests with sub-millisecond latency.",
		},
		{
			subTitle: "99.999%",
			title: "Uptime for 5G Core",
			description:
				"Major Telco deployed a carrier-grade 5G core with 99.999% uptime using LoxiLB.",
		},
	];
	return (
		<RootSectionLayout
			eyebrow="Proven by Global Leaders"
			title="Trusted by Fortune 500s"
			bgImage={
				<BackgroundImage
					className="mix-blend-overlay"
					src="/images/common/bg_content.png"
				/>
			}
			className="bg-gradient-to-t from-blue-100/15 to-blue-40/15"
		>
			<Reveal delayMs={300}>
				<div className="flex flex-col items-stretch gap-6 md:flex-row lg:gap-12.5">
					{data.map((item, index) => (
						<Fragment key={item.title}>
							{index !== 0 && (
								<Separator
									opacity="25"
									orientation="vertical"
									className="hidden h-auto md:my-[5%] md:block"
								/>
							)}
							<div>
								<strong className="title-44 text-blue-40 lg:title-60">
									{item.subTitle}
								</strong>
								<h3 className="title-20 mt-6 lg:title-24 lg:mt-9">
									{item.title}
								</h3>
								<p className="paragraph-14 mt-3 lg:paragraph-16 lg:mt-4.5">
									{item.description}
								</p>
							</div>
						</Fragment>
					))}
				</div>
			</Reveal>
			<Reveal delayMs={450}>
				<ButtonBox className="mt-23">
					<Button variant="primary">View All Success Stories</Button>
				</ButtonBox>
			</Reveal>
		</RootSectionLayout>
	);
};
