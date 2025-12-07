import type { ReactNode } from "react";

import { BackgroundImage, Reveal } from "@/shared/ui/display";

interface Props {
	title: string;
	description: ReactNode;
	image: string;
}
export const PageHero = ({ title, description, image }: Props) => {
	return (
		<section className="overflow-hidden">
			<div className="relative pt-header">
				<BackgroundImage opacity="50" src={image} />

				<div className="wrapper flex h-[300px] flex-col items-center justify-center gap-4 text-center lg:h-[420px] lg:gap-6">
					<Reveal>
						<h2 className="title-36 md:title-44 lg:title-60">{title}</h2>
					</Reveal>
					<Reveal>
						<p className="paragraph-16 lg:paragraph-20">{description}</p>
					</Reveal>
				</div>
			</div>
		</section>
	);
};
