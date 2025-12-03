"use client";

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

export const ProductsSaasIntro = ({ themeColor }: Props) => {
	const carouselImage = [
		{
			src: "/images/products/img_saas_slide1.jpg",
			alt: "Feature 1",
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
					<Button
						colors={themeColor}
						className={cn("mt-8 lg:mt-15")}
						onClick={() => {
							alert(
								"The AWS Marketplace service is currently under preparation. It is scheduled for official launch in the first quarter of 2026. We will be launching soon!",
							);
						}}
					>
						Launch on AWS
					</Button>
				</div>
				<div className={halfWidthMd}>
					<PageImagesCarousel images={carouselImage} />
				</div>
			</div>
		</Reveal>
	);
};
