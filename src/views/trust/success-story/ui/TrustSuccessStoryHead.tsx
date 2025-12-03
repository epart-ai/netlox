import { Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui";
import type {
	TrustSuccessStoryEntry,
	TrustSuccessStoryId,
} from "@/views/trust/success-story/lib/trustSuccessStoryRegistry";

interface TrustSuccessStoryHeadProps {
	id: TrustSuccessStoryId;
	entry?: TrustSuccessStoryEntry;
}

export const TrustSuccessStoryHead = ({
	id,
	entry,
}: TrustSuccessStoryHeadProps) => {
	const eyebrow = entry?.meta.eyebrow ?? "Trust";
	const title = entry?.meta.title ?? `Success Story ${id}`;

	return (
		<Reveal rootMargin="-25% 0px -25% 0px" threshold={0}>
			<PageHead eyebrow={eyebrow} title={title} />
		</Reveal>
	);
};
