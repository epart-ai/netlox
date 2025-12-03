import { notFound } from "next/navigation";

import {
	getTrustSuccessStoryEntry,
	isTrustSuccessStoryId,
} from "@/views/trust/success-story/lib/trustSuccessStoryRegistry";
import {
	TrustSuccessStoryContainer,
	TrustSuccessStoryHead,
} from "@/views/trust/success-story/ui";

export default function TrustSuccessStoryDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const id = params?.id;

	if (!id || !isTrustSuccessStoryId(id)) {
		notFound();
	}

	const entry = getTrustSuccessStoryEntry(id);

	if (!entry) {
		notFound();
	}

	return (
		<>
			<TrustSuccessStoryHead id={id} entry={entry} />
			<div className="mt-20">
				<TrustSuccessStoryContainer id={id} entry={entry} />
			</div>
		</>
	);
}
