import type { ReactNode } from "react";

import { Reveal } from "@/shared/ui/display";

interface Props {
	title: string;
	date: string;
	description: ReactNode;
}
export const LegalHero = ({ title, date, description }: Props) => {
	return (
		<section className="overflow-hidden">
			<div className="relative border-b border-white/50 pt-header">
				<div className="wrapper flex flex-col items-center justify-center gap-4 py-10 text-center lg:h-[400px] lg:gap-6">
					<Reveal>
						<h2 className="title-28 md:title-36 lg:title-44">{title}</h2>
					</Reveal>
					<Reveal>
						<div className="space-y-2 md:space-y-3">
							<p className="title-14 font-semibold lg:title-18">{date}</p>
							<p className="paragraph-14 space-y-2 lg:paragraph-18 md:space-y-3 [&>b]:font-semibold [&>span]:block">
								{description}
							</p>
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
};
