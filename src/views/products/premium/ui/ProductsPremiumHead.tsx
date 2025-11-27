import { cn } from "@/shared/lib/utils";
import type { ThemeColor } from "@/shared/model/types";
import { flexRowBetweenMd, halfWidthMd } from "@/shared/styles/snippets";
import { Reveal } from "@/shared/ui/display";
import { Button } from "@/shared/ui/shadcn/button";
import { PageHead } from "@/views/_shared/ui/PageHead";
import { ProductsCarousel } from "@/views/products/_shared/ui";

interface Props {
	themeColor: ThemeColor;
}

export const ProductsPremiumHead = ({ themeColor }: Props) => {
	const carouselImage = [
		{
			src: "/images/products/img_premium_slide1.jpg",
			alt: "Premium Slide 1",
		},
		{
			src: "/images/products/img_premium_slide2.jpg",
			alt: "Premium Slide 2",
		},
		{
			src: "/images/products/img_premium_slide3.jpg",
			alt: "Premium Slide 3",
		},
	];

	return (
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
	);
};


