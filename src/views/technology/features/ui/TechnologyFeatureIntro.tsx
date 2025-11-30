import { flexRowBetweenMd, halfWidthMd } from "@/shared/styles/snippets";
import { DataList, Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui/PageHead";
import { PageImagesCarousel } from "@/views/_shared/ui/PageImagesCarousel";

export const TechnologyFeatureIntro = () => {
	const carouselImage = [
		{
			src: "/images/technology/img_features_slide1.jpg",
			alt: "Feature 1",
		},
	];

	return (
		<Reveal>
			<div className={flexRowBetweenMd}>
				<div className={halfWidthMd}>
					<PageHead
						align="left"
						eyebrow="Core Architecture"
						title="The eBPF-Powered Data Plan"
						description={
							<>
								NetLOX leverages eBPF to bypass the kernel&apos;s network stack,
								<br />
								processing packets directly in a sandboxed, JIT-compiled
								environment. <br />
								This eliminates context switching and data copying, <br />
								resulting in unparalleled speed and efficiency.
							</>
						}
					/>
					<DataList
						className="mt-8 gap-3 text-white/50 md:gap-5"
						data={[
							"Kernel-level performance with user-space flexibility.",
							"Dynamically programmable logic without reloading.",
							"Zero-copy packet processing for ultimate throughput.",
						]}
					/>
				</div>
				<div className={halfWidthMd}>
					<PageImagesCarousel images={carouselImage} className="h-[440px]" />
				</div>
			</div>
		</Reveal>
	);
};
