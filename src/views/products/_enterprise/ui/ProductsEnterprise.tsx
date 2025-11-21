import { cn } from "@/shared/lib/utils";
import { DataCard } from "@/shared/ui/display";
import { Button } from "@/shared/ui/shadcn/button";
import { ProductsCarousel } from "@/views/products/ui/ProductsCarousel";

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
			<div className="flex flex-col justify-between gap-8 md:flex-row">
				<div className="md:w-[48.57%]">
					<div className="flex flex-col">
						<strong
							className={cn("title-16 lg:title-18", ` text-${themeColor}-20`)}
						>
							Enterprise
						</strong>
						<h3 className="title-36 mt-1.5 lg:title-44 lg:mt-3">
							Enterprise-Grade
							<br />
							with Fixed Pricing
						</h3>
						<p className="paragraph-16 mt-4 lg:paragraph-18 lg:mt-8">
							The perfect solution for production clusters. <br />
							Get professional support, advanced features, and a 99.9% uptime
							SLA <br /> for a predictable fixed price.
						</p>
					</div>
					<Button className={cn("mt-8 lg:mt-15", `bg-${themeColor}-60`)}>
						Request Quote
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
