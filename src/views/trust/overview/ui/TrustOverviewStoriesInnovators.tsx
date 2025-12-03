import { ROUTES } from "@/shared/config/routes";
import type { ThemeColor } from "@/shared/model/types";
import { cardListGrid } from "@/shared/styles/snippets";
import { Reveal } from "@/shared/ui/display";
import { CardList } from "@/shared/ui/shadcn/card";
import { PostCard } from "@/views/_shared/ui";

interface Props {
	themeColor?: ThemeColor;
}

export const TrustOverviewStoriesInnovators = ({ themeColor }: Props) => {
	const postData = [
		{
			id: 1,
			title: "Private 5G Cloud Service",
			imageUrl: "/images/trust/img_success-story_reference1.jpg",
			textLink: {
				label: "Read Full Story",
				href: ROUTES.TRUST_SUCCESS_STORY.replace(":id", "1"),
			},
		},
		{
			id: 2,
			title: "Cloud Native DRA(Diameter Routing Agent) with SCTP Multi-homing",
			imageUrl: "/images/trust/img_success-story_reference2.jpg",
			textLink: {
				label: "Read Full Story",
				href: ROUTES.TRUST_SUCCESS_STORY.replace(":id", "2"),
			},
		},
		{
			id: 3,
			title: "Multi-Cloud HA Success Story",
			imageUrl: "/images/trust/img_success-story_reference3.jpg",
			textLink: {
				label: "Read Full Story",
				href: ROUTES.TRUST_SUCCESS_STORY.replace(":id", "3"),
			},
		},
	];

	return (
		<Reveal>
			<CardList colors={themeColor} className={cardListGrid}>
				{postData.map((post) => (
					<PostCard
						key={post.id}
						id={post.id}
						title={post.title}
						imageUrl={post.imageUrl}
						textLink={post.textLink}
					/>
				))}
			</CardList>
		</Reveal>
	);
};
