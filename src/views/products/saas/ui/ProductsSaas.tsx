import { cn } from "@/shared/lib/utils";
import {
	flexRowBetweenMd,
	halfWidthMd,
	sectionTitleLg,
} from "@/shared/styles/snippets";
import { DataCard } from "@/shared/ui/display";
import { Button } from "@/shared/ui/shadcn/button";

import { ProductsCarousel } from "../../_shared/ui/ProductsCarousel";
import { PageHead } from "@/views/_shared/ui/PageHead";

export const ProductsSaas = () => {
	const themeColor = "orange";

	const cardData = [
		{
			title: "eBPF Data Plan",
			description: (
				<>
					Maximum performance with
					<br />
					kernel-level packet processing.
				</>
			),
			image: "/images/products/icon_saas_feature1.svg",
		},
		{
			title: "Kubernetes Integration",
			description: (
				<>
					Native support for kube-loxilb,
					<br />
					Service type LB, and more.
				</>
			),
			image: "/images/products/icon_saas_feature2.svg",
		},
		{
			title: "Community Support",
			description: (
				<>
					Get help and contribute via CNCF Slack <br />
					and GitHub Issues.
				</>
			),
			image: "/images/products/icon_saas_feature3.svg",
		},
	];

	const carouselImage = [
		{
			src: "/images/products/saas_slide1.jpg",
			alt: "Feature 1",
		},
		{
			src: "/images/products/saas_slide2.jpg",
			alt: "Feature 2",
		},
		{
			src: "/images/products/saas_slide3.jpg",
			alt: "Feature 3",
		},
	];

	return (
		<>
			<div className={flexRowBetweenMd}>
				<div className={halfWidthMd}>
					<PageHead
						theme="orange"
						align="left"
						eyebrow="SaaS"
						title="LoxiLB on AWS Marketplace"
						description={
							<>
								The easiest way to consume NetLOX. Get a fully managed, <br />
								auto-scaling, pay-as-you-go service directly from the AWS
								Marketplace.
							</>
						}
					/>
					<Button className={cn("mt-8 lg:mt-15", `bg-${themeColor}-60`)}>
						Launch on AWS
					</Button>
				</div>
				<ProductsCarousel images={carouselImage} />
			</div>
			<div className="mt-[100px]">
				<h3 className={sectionTitleLg}>Core Features</h3>
				<DataCard data={cardData} enableHover={true} colors={themeColor} />
			</div>
		</>
	);
};
