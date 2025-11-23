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

export const ProductsOpenSource = () => {
	const themeColor = "green";

	const carouselImage = [
		{
			src: "/images/products/open-source_slide1.png",
			alt: "Open Source Slide 1",
		},
		{
			src: "/images/products/open-source_slide2.png",
			alt: "Open Source Slide 2",
		},
		{
			src: "/images/products/open-source_slide3.png",
			alt: "Open Source Slide 3",
		},
	];

	const cardData = [
		{
			title: "Business Hours Support",
			description: (
				<>
					Maximum performance with
					<br />
					kernel-level packet processing.
				</>
			),
			image: "/images/products/icon_open-source_feature1.svg",
		},
		{
			title: "Kubernetes Integration",
			description: (
				<>
					Native support for kube-loxilb,
					<br />
					Service type LB, and more.
				</>
			),
			image: "/images/products/icon_open-source_feature2.svg",
		},
		{
			title: "Community Support",
			description: (
				<>
					Get help and contribute via CNCF Slack <br />
					and GitHub Issues.
				</>
			),
			image: "/images/products/icon_open-source_feature3.svg",
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
							eyebrow="Open Source"
							title="The eBPF Foundation"
							description={
								<>
									The core of NetLOX, LoxiLB, is a CNCF Sandbox project.
									It&apos;s free, open-source, and driven by a global community
									of developers. Perfect for testing, development, and
									community-supported production use.
								</>
							}
						/>
						<Button colors={themeColor} className={cn("mt-8 lg:mt-15")}>
							Go to GitHub
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
