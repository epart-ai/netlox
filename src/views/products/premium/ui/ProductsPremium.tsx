import { cn } from "@/shared/lib/utils";
import {
	flexRowBetweenMd,
	halfWidthMd,
	sectionTitleLg,
} from "@/shared/styles/snippets";
import { DataCard, Reveal } from "@/shared/ui/display";
import { Button } from "@/shared/ui/shadcn/button";
import { PageHead } from "@/views/_shared/ui/PageHead";
import { ProductsCarousel } from "@/views/products/_shared/ui/ProductsCarousel";

export const ProductsPremium = () => {
	const themeColor = "purple";

	const carouselImage = [
		{
			src: "/images/products/premium_slide1.png",
			alt: "Premium Slide 1",
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
			<Reveal rootMargin="-25% 0px -25% 0px" threshold={0}>
				<div className={flexRowBetweenMd}>
					<div className={halfWidthMd}>
						<PageHead
							theme={themeColor}
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
							colors={themeColor}
							className={cn("mt-8 lg:mt-15")}
						>
							Schedule Executive Briefing
						</Button>
					</div>
					<ProductsCarousel images={carouselImage} />
				</div>
			</Reveal>
			<Reveal delayMs={300}>
				<div className="mt-[100px]">
					<h3 className={sectionTitleLg}>Core Features</h3>
					<DataCard data={cardData} enableHover={true} colors={themeColor} />
				</div>
			</Reveal>
		</>
	);
};
