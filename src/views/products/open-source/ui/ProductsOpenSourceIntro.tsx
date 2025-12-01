import Link from "next/link";

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

export const ProductsOpenSourceIntro = ({ themeColor }: Props) => {
	const carouselImage = [
		{
			src: "/images/products/img_open-source_slide1.png",
			alt: "Open Source Slide 1",
		},
		{
			src: "/images/products/img_open-source_slide2.png",
			alt: "Open Source Slide 2",
		},
		{
			src: "/images/products/img_open-source_slide3.png",
			alt: "Open Source Slide 3",
		},
	];

	return (
		<Reveal rootMargin="-25% 0px -25% 0px" threshold={0}>
			<div className={flexRowBetweenMd}>
				<div className={halfWidthMd}>
					<PageHead
						theme={themeColor}
						align="left"
						eyebrow="Open Source"
						title="The eBPF Foundation"
						description={
							<>
								The core of NetLOX, LoxiLB, is a CNCF Sandbox project. It&apos;s
								free, open-source, and driven by a global community of
								developers. Perfect for testing, development, and
								community-supported production use.
							</>
						}
					/>
					<Button asChild colors={themeColor} className={cn("mt-8 lg:mt-15")}>
						<Link href="https://github.com/loxilb-io/loxilb" target="_blank">
							Go to GitHub
						</Link>
					</Button>
				</div>
				<div className={halfWidthMd}>
					<PageImagesCarousel images={carouselImage} />
				</div>
			</div>
		</Reveal>
	);
};
