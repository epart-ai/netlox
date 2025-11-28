import type { ThemeColor } from "@/shared/model/types";
import { Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui";

interface Props {
	themeColor: ThemeColor;
}

export const TrustValidationHead = ({ themeColor }: Props) => {
	return (
		<Reveal rootMargin="-25% 0px -25% 0px" threshold={0}>
			<PageHead
				eyebrow="Validation"
				title="Community & Partner Ecosystem"
				description="Our technology is vetted by the cloud-native community and trusted by leading technology partners."
				theme={themeColor}
			/>
		</Reveal>
	);
};
