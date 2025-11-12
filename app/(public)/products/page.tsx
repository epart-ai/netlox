import Image from "next/image";

import { BackgroundImage, DataCard, DataCarousel } from "@/shared/ui/display";
import { Button } from "@/shared/ui/shadcn";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/shared/ui/shadcn/tabs";

export default function Page() {
	const data = [
		{
			title: "eBPF Data Plan",
			description: (
				<>
					Maximum performance with
					<br />
					kernel-level packet processing.
				</>
			),
			image: "/images/products/icon_source_feature1.svg",
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
			image: "/images/products/icon_source_feature2.svg",
		},
		{
			title: "Community Support",
			description: (
				<>
					Get help and contribute via CNCF Slack <br />
					and GitHub Issues.
				</>
			),
			image: "/images/products/icon_source_feature3.svg",
		},
	];

	const carouselImage = [
		{
			src: "/images/products/source_slide.jpg",
			alt: "Feature 1",
		},
		{
			src: "/images/products/source_slide.jpg",
			alt: "Feature 2",
		},
		{
			src: "/images/products/source_slide.jpg",
			alt: "Feature 3",
		},
	];

	const carouselData = carouselImage.map((image) => {
		return (
			<div
				key={image.src}
				className="overflow-hidden rounded-2xl border border-white/25"
			>
				<Image
					src={image.src}
					alt={image.alt}
					width={0}
					height={0}
					sizes="100vw"
					style={{ width: "100%", height: "auto" }}
				/>
			</div>
		);
	});
	return (
		<>
			<section className="overflow-hidden">
				<div className="wrapper relative pt-header">
					<BackgroundImage opacity="50" src="/images/products/bg_hero.jpg" />
					<div className="flex h-[260px] flex-col items-center justify-center gap-4 text-center lg:h-[420px] lg:gap-6">
						<h2 className="title-36 lg:title-60">NetLOX Products</h2>
						<p className="paragraph-16 lg:paragraph-20">
							From open-source community editions to 24/7 supported <br />
							enterprise-grade deployments, NetLOX provides the right solution
							for your scale.
						</p>
					</div>
				</div>
			</section>
			<Tabs defaultValue="openSource" className="">
				<TabsList>
					<div className="wrapper">
						<TabsTrigger value="openSource">Open Source </TabsTrigger>
						<TabsTrigger value="enterprise">Enterprise</TabsTrigger>
						<TabsTrigger value="premium">Premium</TabsTrigger>
						<TabsTrigger value="saas">SaaS</TabsTrigger>
					</div>
				</TabsList>
				<div className="pt-[50px] lg:pt-[100px]">
					<BackgroundImage
						className="mix-blend-overlay"
						src="/images/common/bg_content.png"
					/>
					<div className="wrapper">
						<TabsContent value="openSource">
							<div className="flex flex-col justify-between gap-8 md:flex-row">
								<div className="md:w-[48.57%]">
									<div className="flex flex-col">
										<strong className="title-16 text-green-60 lg:title-18">
											Open Source
										</strong>
										<h3 className="title-36 mt-1.5 lg:title-44 lg:mt-3">
											The eBPF Foundation
										</h3>
										<p className="paragraph-16 mt-4 lg:paragraph-18 lg:mt-8">
											The core of NetLOX, LoxiLB, is a CNCF Sandbox project.
											It&apos;s free, open-source, and driven by a global
											community of developers. Perfect for testing, development,
											and community-supported production use.
										</p>
									</div>
									<Button
										variant="primary"
										className="mt-8 bg-green-60 lg:mt-15"
									>
										Go to GitHub
									</Button>
								</div>
								<div className="md:w-[48.57%]">
									<DataCarousel data={carouselData} />
								</div>
							</div>
							<div className="mt-[100px]">
								<h3 className="title-28 mb-4 lg:title-40 lg:mb-8">
									Core Features
								</h3>
								<DataCard data={data} enableHover={true} colors="green" />
							</div>
						</TabsContent>
						<TabsContent value="enterprise">Enterprise Contents</TabsContent>
						<TabsContent value="premium">Premium Contents</TabsContent>
						<TabsContent value="saas">SaaS Contents</TabsContent>
					</div>
				</div>
			</Tabs>
			<div></div>
		</>
	);
}
