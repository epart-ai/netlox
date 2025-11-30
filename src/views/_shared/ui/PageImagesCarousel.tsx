import Image from "next/image";

import { DataCarousel } from "@/shared/ui/display";

interface Props {
	images: {
		src: string;
		alt: string;
	}[];
	className?: string;
}

export const PageImagesCarousel = ({ images, className }: Props) => {
	const data = images.map((image) => {
		return (
			<div
				key={image.src}
				className="overflow-hidden rounded-lg border border-white/25 lg:rounded-2xl"
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

	return <DataCarousel data={data} className={className} />;
};
