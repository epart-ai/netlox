import Image from "next/image";

import { cn } from "@/shared/lib/utils";
import {
	flexRowBetweenMd,
	halfWidthMd,
	imageRounded,
} from "@/shared/styles/snippets";
import { DataList, Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui/PageHead";

export const BusinessPricingDetailList = () => {
	const detailList = [
		{
			eyebrow: "Enterprise Edition",
			title: "Fixed Price, Full Support",
			description: (
				<>
					Best for production Kubernetes clusters and teams requiring <br />
					professional support. <br />
					Get 99.9% uptime SLA, security patching, and advanced monitoring.
				</>
			),
			dataList: [
				"Business hours support (9-6)",
				"Advanced web dashboard",
				"High availability configuration",
			],
			image: "/images/business/img_pricing-detail_enterprise.jpg",
		},
		{
			eyebrow: "Premium Edition",
			title: "24/7 Mission-Critical Support",
			description: (
				<>
					For large enterprises, telcos, and financial services <br />
					with zero downtime tolerance. <br />
					Includes custom feature development and a dedicated engineer.
				</>
			),
			dataList: [
				"24/7/365 dedicated support",
				"Named technical account manager",
				"Custom feature development",
			],
			image: "/images/business/img_pricing-detail_premium.jpg",
		},
		{
			eyebrow: "SaaS Edition",
			title: "Fully Managed on AWS",
			description: (
				<>
					The easiest way to get started. Pay-as-you-go, fully managed, <br />
					and auto-scaling. <br />
					Launch directly from the AWS Marketplace.
				</>
			),
			dataList: [
				"5-minute deployment",
				"Automatic scaling",
				"No infrastructure management",
			],
			image: "/images/business/img_pricing-detail_saas.jpg",
		},
	];
	return (
		<div className="space-y-14 lg:space-y-[100px]">
			{detailList.map((item) => (
				<Reveal key={item.title}>
					<div className={flexRowBetweenMd}>
						<div className={halfWidthMd}>
							<PageHead
								align="left"
								eyebrow={item.eyebrow}
								title={item.title}
								description={item.description}
							/>
							<DataList
								className="mt-8 gap-3 text-white/50 md:gap-5"
								data={item.dataList}
							/>
						</div>
						<div className={halfWidthMd}>
							<Image
								src={item.image}
								alt={item.title}
								className={cn(imageRounded, "aspect-[1.6585365853658536]")}
								width={680}
								height={410}
							/>
						</div>
					</div>
				</Reveal>
			))}
		</div>
	);
};
