import {
	TrustSuccessStoryHashScroll,
	TrustSuccessStoryHead,
	TrustSuccessStoryHighlight,
	TrustSuccessStoryStoriesHead,
	TrustSuccessStoryStoriesInnovators,
	TrustSuccessStoryUseCaseHead,
	TrustSuccessStoryUseCaseIndustry,
	TrustSuccessStoryValidationEcosystem,
	TrustSuccessStoryValidationHead,
} from "@/views/trust/success-story/root/ui";

const paddingTopClass = "pt-[160px]";

export default function TrustOverviewPage() {
	return (
		<div>
			<TrustSuccessStoryHashScroll />
			<div className={paddingTopClass}>
				<TrustSuccessStoryHead />
				<div className="mt-20">
					<TrustSuccessStoryHighlight />
				</div>
			</div>
			<div id="trust-success-stories" className={paddingTopClass}>
				<TrustSuccessStoryStoriesHead />
				<div className="mt-20">
					<TrustSuccessStoryStoriesInnovators />
				</div>
			</div>
			<div className={paddingTopClass}>
				<TrustSuccessStoryUseCaseHead />
				<div className="mt-20">
					<TrustSuccessStoryUseCaseIndustry />
				</div>
			</div>
			<div className={paddingTopClass}>
				<TrustSuccessStoryValidationHead />
				<div className="mt-20">
					<TrustSuccessStoryValidationEcosystem />
				</div>
			</div>
		</div>
	);
}
