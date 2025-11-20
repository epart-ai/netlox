import { cn } from "@/shared/lib/utils";
import { DataCard } from "@/shared/ui/display";
import { Button } from "@/shared/ui/shadcn";
import { ProductsCarousel } from "@/views/products/ui/ProductsCarousel";

export const ProductsOpenSource = () => {
	const themeColor = "green";

	const carouselImage = [
		{
			src: "/images/products/open-source_slide1.jpg",
			alt: "Feature 1",
		},
		{
			src: "/images/products/open-source_slide2.jpg",
			alt: "Feature 2",
		},
		{
			src: "/images/products/open-source_slide3.jpg",
			alt: "Feature 3",
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
			<div className="flex flex-col justify-between gap-8 md:flex-row">
				<div className="md:w-[48.57%]">
					<div className="flex flex-col">
						<strong
							className={cn("title-16 lg:title-18", ` text-${themeColor}-20`)}
						>
							Open Source
						</strong>
						<h3 className="title-36 mt-1.5 lg:title-44 lg:mt-3">
							The eBPF Foundation
						</h3>
						<p className="paragraph-16 mt-4 lg:paragraph-18 lg:mt-8">
							The core of NetLOX, LoxiLB, is a CNCF Sandbox project. It&apos;s
							free, open-source, and driven by a global community of developers.
							Perfect for testing, development, and community-supported
							production use.
						</p>
					</div>
					<Button className={cn("mt-8 lg:mt-15", `bg-${themeColor}-60`)}>
						Go to GitHub
					</Button>
				</div>
				<ProductsCarousel images={carouselImage} />
			</div>
			<div className="mt-[100px]">
				<h3 className="title-28 mb-4 lg:title-40 lg:mb-8">Core Features</h3>
				<DataCard data={cardData} enableHover={true} colors={themeColor} />
			</div>
		</>
	);
};
