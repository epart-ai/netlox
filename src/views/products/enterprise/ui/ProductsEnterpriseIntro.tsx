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

export const ProductsEnterpriseIntro = ({ themeColor }: Props) => {
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
					<Button colors={themeColor} className={cn("mt-8 lg:mt-15")}>
						Request Quote
					</Button>
				</div>
				<ProductsCarousel images={carouselImage} />
			</div>
		</Reveal>
	);
};
