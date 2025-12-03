import type { ReactNode } from "react";

import { Reference1 } from "../ui/Reference1";
import { Reference2 } from "../ui/Reference2";
import { Reference3 } from "../ui/Reference3";

type ReferenceComponent = () => JSX.Element;

export type TrustSuccessStoryId = "1" | "2" | "3";
export type TrustSuccessStoryMeta = {
	eyebrow: string;
	title: ReactNode;
};

export type TrustSuccessStoryEntry = {
	meta: TrustSuccessStoryMeta;
	component: ReferenceComponent;
};

const successStoryRegistry: Record<
	TrustSuccessStoryId,
	TrustSuccessStoryEntry
> = {
	"1": {
		meta: {
			eyebrow: "Reference #1",
			title: "Private 5G Cloud Service",
		},
		component: Reference1,
	},
	"2": {
		meta: {
			eyebrow: "Reference #2",
			title: (
				<>
					Cloud Native DRA(Diameter Routing Agent)
					<br /> with SCTP Multi-homing
				</>
			),
		},
		component: Reference2,
	},
	"3": {
		meta: {
			eyebrow: "Reference #3",
			title: "Multi-Cloud HA Success Story",
		},
		component: Reference3,
	},
};

export const TRUST_SUCCESS_STORY_IDS = Object.keys(
	successStoryRegistry,
) as TrustSuccessStoryId[];

export const isTrustSuccessStoryId = (id: string): id is TrustSuccessStoryId =>
	id in successStoryRegistry;

export const getTrustSuccessStoryEntry = (
	id: string,
): TrustSuccessStoryEntry | undefined =>
	successStoryRegistry[id as TrustSuccessStoryId];
