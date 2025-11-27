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

export const ProductsSaasHead = ({ themeColor }: Props) => {
	const carouselImage = [
		{
			src: "/images/products/img_saas_slide1.jpg",
			alt: "Feature 1",
		},
		{
			src: "/images/products/img_saas_slide2.jpg",
			alt: "Feature 2",
		},
		{
			src: "/images/products/img_saas_slide3.jpg",
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
					<Button colors={themeColor} className={cn("mt-8 lg:mt-15")}>
						Launch on AWS
					</Button>
				</div>
				<ProductsCarousel images={carouselImage} />
			</div>
		</Reveal>
	);
};


