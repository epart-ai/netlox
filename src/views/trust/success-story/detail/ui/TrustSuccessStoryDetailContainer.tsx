import { Reveal } from "@/shared/ui/display";

import type {
	TrustSuccessStoryEntry,
	TrustSuccessStoryId,
} from "../lib/trustSuccessStoryRegistry";

interface TrustSuccessStoryContainerProps {
	id: TrustSuccessStoryId;
	entry?: TrustSuccessStoryEntry;
}

export const TrustSuccessStoryContainer = ({
	id,
	entry,
}: TrustSuccessStoryContainerProps) => {
	const ReferenceComponent = entry?.component;

	return (
		<Reveal rootMargin="-25% 0px -25% 0px" threshold={0}>
			{ReferenceComponent ? (
				<ReferenceComponent />
			) : (
				<p className="text-center text-sm text-slate-500">
					성공 사례 {id}에 대한 자료를 곧 추가합니다.
				</p>
			)}
		</Reveal>
	);
};
