import Image from "next/image";

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
		<div className="md:w-[48.57%]">
			<DataCarousel data={carouselData} />
		</div>
	);
};
