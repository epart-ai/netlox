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

export const ProductsEnterprise = () => {
	const themeColor = "blue";

	const cardData = [
		{
			title: "Business Hours Support",
			description: (
				<>
					Access our expert engineering team <br /> (9AM-6PM).
				</>
			),
			image: "/images/products/icon_enterprise_feature1.svg",
		},
		{
			title: "Security Patching",
			description: (
				<>
					Receive timely security updates <br /> and patches.
				</>
			),
			image: "/images/products/icon_enterprise_feature2.svg",
		},
		{
			title: "High Availability (HA)",
			description: (
				<>
					Includes configuration support <br /> for multi-AZ resilience.
				</>
			),
			image: "/images/products/icon_enterprise_feature3.svg",
		},
	];

	const carouselImage = [
		{
			src: "/images/products/enterprise_slide1.jpg",
			alt: "Feature 1",
		},
		{
			src: "/images/products/enterprise_slide2.jpg",
			alt: "Feature 2",
		},
		{
			src: "/images/products/enterprise_slide3.jpg",
			alt: "Feature 3",
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
							eyebrow="Enterprise"
							title={
								<>
									Enterprise-Grade
									<br />
									with Fixed Pricing
								</>
							}
							description={
								<>
									The perfect solution for production clusters. <br />
									Get professional support, advanced features, and a 99.9%
									uptime SLA <br /> for a predictable fixed price.
								</>
							}
						/>
						<Button colors={themeColor} className={cn("mt-8 lg:mt-15")}>
							Request Quote
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
