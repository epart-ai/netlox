import type { ThemeColor } from "@/shared/model/types";
import { cardListGrid } from "@/shared/styles/snippets";
import { Reveal } from "@/shared/ui/display";
import { CardList } from "@/shared/ui/shadcn/card";
import { PostCard } from "@/views/_shared/ui";

interface Props {
	themeColor: ThemeColor;
}

export const TrustStoriesInnovators = ({ themeColor }: Props) => {
	const postData = [
		{
			id: 1,
			title: "NetLOX Success Stories title area sample text",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et",
			imageUrl: "/images/trust/img_post.jpg",
			textLink: {
				label: "Read Full Story",
				href: "/trust/stories",
			},
		},
		{
			id: 2,
			title: "NetLOX Success Stories title area sample text",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et",
			imageUrl: "/images/trust/img_post.jpg",
			textLink: {
				label: "Read Full Story",
				href: "/trust/stories",
			},
		},
		{
			id: 3,
			title: "NetLOX Success Stories title area sample text",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et",
			imageUrl: "/images/trust/img_post.jpg",
			textLink: {
				label: "Read Full Story",
				href: "/trust/stories",
			},
		},
	];

	return (
		<Reveal delayMs={300}>
			<CardList colors={themeColor} enableHover className={cardListGrid}>
				{postData.map((post) => (
					<PostCard
						key={post.id}
						id={post.id}
						title={post.title}
						description={post.description}
						imageUrl={post.imageUrl}
						textLink={post.textLink}
					/>
				))}
			</CardList>
		</Reveal>
	);
};
