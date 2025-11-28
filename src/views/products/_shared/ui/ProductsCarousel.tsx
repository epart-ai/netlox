import Image from "next/image";

import { halfWidthMd, sectionFrame } from "@/shared/styles/snippets";
import { DataCarousel } from "@/shared/ui/display";

interface Props {
	images: {
		src: string;
		alt: string;
	}[];
}

export const ProductsCarousel = ({ images }: Props) => {
	const carouselData = images.map((image) => {
		return (
			<div key={image.src} className={sectionFrame}>
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
		<div className={halfWidthMd}>
			<DataCarousel data={carouselData} opts={{ loop: true }} />
		</div>
	);
};
