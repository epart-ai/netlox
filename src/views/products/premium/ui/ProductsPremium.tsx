import { cn } from "@/shared/lib/utils";
import {
	flexRowBetweenMd,
	halfWidthMd,
	sectionTitleLg,
} from "@/shared/styles/snippets";
import { DataCard } from "@/shared/ui/display";
import { Button } from "@/shared/ui/shadcn/button";
import { ProductsCarousel } from "@/views/products/_shared/ui/ProductsCarousel";
import { PageHead } from "@/views/_shared/ui/PageHead";

export const ProductsPremium = () => {
	const themeColor = "purple";

	const carouselImage = [
		{
			src: "/images/products/premium_slide1.jpg",
			alt: "Feature 1",
		},
		{
			src: "/images/products/premium_slide2.jpg",
			alt: "Feature 2",
		},
		{
			src: "/images/products/premium_slide3.jpg",
			alt: "Feature 3",
		},
	];

	const cardData = [
		{
			title: "Dedicated Engineer",
			description: (
				<>
					A named technical account manager <br />
					who knows your environment.
				</>
			),
			image: "/images/products/icon_premium_feature1.svg",
		},
		{
			title: "Custom Development",
			description: (
				<>
					Get custom features and protocols <br />
					developed for your needs.
				</>
			),
			image: "/images/products/icon_premium_feature2.svg",
		},
		{
			title: "Architecture Reviews",
			description: (
				<>
					Proactive architecture reviews <br />
					and optimization consulting.
				</>
			),
			image: "/images/products/icon_premium_feature3.svg",
		},
	];

	return (
		<>
			<div className={flexRowBetweenMd}>
				<div className={halfWidthMd}>
					<PageHead
						theme="purple"
						align="left"
						eyebrow="Premium"
						title={
							<>
								24/7 Support <br />& Custom Development
							</>
						}
						description={
							<>
								For mission-critical deployments that tolerate zero downtime.
								<br />
								Get a dedicated engineer, 24/7/365 coverage, <br />
								and custom feature development.
							</>
						}
					/>
					<Button
						variant="primary"
						className={cn("mt-8 lg:mt-15", `bg-${themeColor}-60`)}
					>
						Schedule Executive Briefing
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
