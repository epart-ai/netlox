import Link from "next/link";

import { ROUTES } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import type { ThemeColor } from "@/shared/model/types";
import { flexRowBetweenMd, halfWidthMd } from "@/shared/styles/snippets";
import { Reveal } from "@/shared/ui/display";
import { Button } from "@/shared/ui/shadcn/button";
import { PageHead } from "@/views/_shared/ui/PageHead";
import { PageImagesCarousel } from "@/views/_shared/ui/PageImagesCarousel";

interface Props {
	themeColor: ThemeColor;
}

export const ProductsPremiumIntro = ({ themeColor }: Props) => {
	const carouselImage = [
		{
			src: "/images/products/img_premium_slide1.jpg",
			alt: "Premium Slide 1",
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
					<Button asChild colors={themeColor} className={cn("mt-8 lg:mt-15")}>
						<Link href={ROUTES.BUSINESS_CONTACT}>
							Schedule Executive Briefing
						</Link>
					</Button>
				</div>
				<div className={halfWidthMd}>
					<PageImagesCarousel images={carouselImage} className="aspect-[1.7]" />
				</div>
			</div>
		</Reveal>
	);
};
