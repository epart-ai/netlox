import { BackgroundImage } from "./BackgroundImage";

interface Props {
	title: string;
	description: string;
	image: string;
}
export const SubPageHero = ({ title, description, image }: Props) => {
	return (
		<section className="overflow-hidden">
			<div className="relative pt-header">
				<BackgroundImage opacity="50" src={image} />
				<div className="wrapper flex h-[260px] flex-col items-center justify-center gap-4 text-center lg:h-[420px] lg:gap-6">
					<h2 className="title-36 lg:title-60">{title}</h2>
					<p className="paragraph-16 lg:paragraph-20">{description}</p>
				</div>
			</div>
		</section>
	);
};
