import { cn } from "@/shared/lib/utils";
import { DataCard } from "@/shared/ui/display";
import { Button } from "@/shared/ui/shadcn";

import { ProductsCarousel } from "../../ui/ProductsCarousel";

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
			<div className="flex flex-col justify-between gap-8 md:flex-row">
				<div className="md:w-[48.57%]">
					<div className="flex flex-col">
						<strong
							className={cn("title-16 lg:title-18", ` text-${themeColor}-20`)}
						>
							SaaS
						</strong>
						<h3 className="title-36 mt-1.5 lg:title-44 lg:mt-3">
							LoxiLB on AWS Marketplace
						</h3>
						<p className="paragraph-16 mt-4 lg:paragraph-18 lg:mt-8">
							The easiest way to consume NetLOX. Get a fully managed, <br />
							auto-scaling, pay-as-you-go service directly from the AWS
							Marketplace.
						</p>
					</div>
					<Button className={cn("mt-8 lg:mt-15", `bg-${themeColor}-60`)}>
						Launch on AWS
					</Button>
				</div>
				<ProductsCarousel images={carouselImage} />
			</div>
			<div className="mt-[100px]">
				<h3 className="title-28 mb-4 lg:title-40 lg:mb-8">Core Features</h3>
				<DataCard data={cardData} enableHover={true} colors={themeColor} />
			</div>
		</>
	);
};
