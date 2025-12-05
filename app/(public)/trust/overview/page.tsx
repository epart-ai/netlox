import {
	TrustSuccessStoryHead,
	TrustSuccessStoryHighlight,
	TrustSuccessStoryStoriesHead,
	TrustSuccessStoryStoriesInnovators,
	TrustSuccessStoryUseCaseHead,
	TrustSuccessStoryUseCaseIndustry,
	TrustSuccessStoryValidationEcosystem,
	TrustSuccessStoryValidationHead,
} from "@/views/trust/success-story/root/ui";

export default function TrustOverviewPage() {
	return (
		<div className="space-y-[160px]">
			<div>
				<TrustSuccessStoryHead />
				<div className="mt-10 lg:mt-20">
					<TrustSuccessStoryHighlight />
				</div>
			</div>
			<div>
				<TrustSuccessStoryStoriesHead />
				<div className="mt-10 lg:mt-20">
					<TrustSuccessStoryStoriesInnovators />
				</div>
			</div>
			<div>
				<TrustSuccessStoryUseCaseHead />
				<div className="mt-10 lg:mt-20">
					<TrustSuccessStoryUseCaseIndustry />
				</div>
			</div>
			<div>
				<TrustSuccessStoryValidationHead />
				<div className="mt-10 lg:mt-20">
					<TrustSuccessStoryValidationEcosystem />
				</div>
			</div>
		</div>
	);
}
