import { Fragment } from "react";

import { BackgroundImage } from "@/shared/ui/display";
import { Button, ButtonBox, Separator } from "@/shared/ui/shadcn";

import { MainSectionLayout } from "./MainSectionLayout";

export const MainSuccess = () => {
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
		<MainSectionLayout
			subTitle="Proven by Global Leaders"
			title="Trusted by Fortune 500s"
			bgImage={
				<BackgroundImage
					className="opacity-100 mix-blend-overlay"
					src="/images/main/bg_success.png"
				/>
			}
		>
			<div className="flex flex-col items-stretch gap-6 md:flex-row lg:gap-12.5">
				{data.map((item, index) => (
					<Fragment key={index}>
						{index !== 0 && (
							<Separator
								opacity="25"
								orientation="vertical"
								className="hidden h-auto md:my-[5%] md:block"
							/>
						)}
						<div>
							<strong className="title-44 text-blue-20 lg:title-60">
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
			<ButtonBox className="mt-23">
				<Button variant="primary">View All Success Stories</Button>
			</ButtonBox>
		</MainSectionLayout>
	);
};
