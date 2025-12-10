import type { ThemeColor } from "@/shared/model/types";
import { DataCard, Reveal } from "@/shared/ui/display";

interface Props {
	themeColor?: ThemeColor;
}

export const TrustSuccessStoryValidationEcosystem = ({ themeColor }: Props) => {
	const cardData = [
		{
			title: "CNCF Sandbox Project",
			description: (
				<>
					Vetted and approved by the Cloud Native <br />
					Computing Foundation.
				</>
			),
			icon: "/images/trust/icon_success-story_validation1.svg",
		},
		{
			title: "2,000+ GitHub Stars",
			description: (
				<>
					Driven by a vibrant and growing <br />
					open-source community.
				</>
			),
			icon: "/images/trust/icon_success-story_validation2.svg",
		},
		{
			title: "eBPF Official Project",
			description: (
				<>
					Certified and integrated with major cloud <br />
					and technology providers.
				</>
			),
			icon: "/images/trust/icon_success-story_validation3.avif",
		},
	];

	return (
		<Reveal>
			<DataCard data={cardData} colors={themeColor} />
		</Reveal>
	);
};
