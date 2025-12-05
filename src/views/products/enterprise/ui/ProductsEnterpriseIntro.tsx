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
	themeColor?: ThemeColor;
}

export const ProductsEnterpriseIntro = ({ themeColor }: Props) => {
	const carouselImage = [
		{
			src: "/images/products/img_enterprise_slide1.png",
			alt: "Feature 1",
		},
		{
			src: "/images/products/img_enterprise_slide2.png",
			alt: "Feature 2",
		},
		{
			src: "/images/products/img_enterprise_slide3.png",
			alt: "Feature 3",
		},
	];

	return (
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
								Get professional support, advanced features, and a 99.9% uptime
								SLA <br /> for a predictable fixed price.
							</>
						}
					/>
					<Button asChild colors={themeColor} className={cn("mt-8 lg:mt-15")}>
						<Link href={ROUTES.BUSINESS_CONTACT}>Request Quote</Link>
					</Button>
				</div>
				<div className={halfWidthMd}>
					<PageImagesCarousel images={carouselImage} className="aspect-[1.7]" />
				</div>
			</div>
		</Reveal>
	);
};
