import { cn } from "@/shared/lib/utils";
import { DataCard } from "@/shared/ui/display";
import { Button } from "@/shared/ui/shadcn/button";
import { ProductsCarousel } from "@/views/products/ui/ProductsCarousel";

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
			<div className="flex flex-col justify-between gap-8 md:flex-row">
				<div className="md:w-[48.57%]">
					<div className="flex flex-col">
						<strong
							className={cn("title-16 lg:title-18", ` text-${themeColor}-20`)}
						>
							Premium
						</strong>
						<h3 className="title-36 mt-1.5 lg:title-44 lg:mt-3">
							24/7 Support <br />& Custom Development
						</h3>
						<p className="paragraph-16 mt-4 lg:paragraph-18 lg:mt-8">
							For mission-critical deployments that tolerate zero downtime.
							<br />
							Get a dedicated engineer, 24/7/365 coverage, <br />
							and custom feature development.
						</p>
					</div>
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
				<h3 className="title-28 mb-4 lg:title-40 lg:mb-8">Core Features</h3>
				<DataCard data={cardData} enableHover={true} colors={themeColor} />
			</div>
		</>
	);
};
