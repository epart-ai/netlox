import { ROUTES } from "@/shared/config/routes";
import { cardListGrid } from "@/shared/styles/snippets";
import { Reveal } from "@/shared/ui/display";
import { CardList } from "@/shared/ui/shadcn/card";
import { PostCard } from "@/views/_shared/ui";

export const TrustSuccessStoryStoriesInnovators = () => {
	const postData = [
		{
			id: 1,
			title: "Private 5G Cloud Service",
			imageUrl: "/images/trust/img_success-story_detail1.jpg",
			textLink: {
				label: "Read Full Story",
				href: ROUTES.TRUST_SUCCESS_STORY_DETAIL.replace(":id", "1"),
			},
		},
		{
			id: 2,
			title: "Cloud Native DRA(Diameter Routing Agent) with SCTP Multi-homing",
			imageUrl: "/images/trust/img_success-story_detail2.jpg",
			textLink: {
				label: "Read Full Story",
				href: ROUTES.TRUST_SUCCESS_STORY_DETAIL.replace(":id", "2"),
			},
		},
		{
			id: 3,
			title: "Multi-Cloud HA Success Story",
			imageUrl: "/images/trust/img_success-story_detail3.jpg",
			textLink: {
				label: "Read Full Story",
				href: ROUTES.TRUST_SUCCESS_STORY_DETAIL.replace(":id", "3"),
			},
		},
	];

	return (
		<Reveal>
			<CardList colors="blue" className={cardListGrid}>
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
