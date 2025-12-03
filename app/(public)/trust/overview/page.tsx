import {
	TrustOverviewHead,
	TrustOverviewHighlight,
	TrustOverviewStoriesHead,
	TrustOverviewStoriesInnovators,
	TrustOverviewUseCaseHead,
	TrustOverviewUseCaseIndustry,
	TrustOverviewValidationEcosystem,
	TrustOverviewValidationHead,
} from "@/views/trust/overview/ui";

export default function TrustOverviewPage() {
	return (
		<div className="space-y-[160px]">
			<div>
				<TrustOverviewHead />
				<div className="mt-20">
					<TrustOverviewHighlight />
				</div>
			</div>
			<div>
				<TrustOverviewStoriesHead />
				<div className="mt-20">
					<TrustOverviewStoriesInnovators />
				</div>
			</div>
			<div>
				<TrustOverviewUseCaseHead />
				<div className="mt-20">
					<TrustOverviewUseCaseIndustry />
				</div>
			</div>
			<div>
				<TrustOverviewValidationHead />
				<div className="mt-20">
					<TrustOverviewValidationEcosystem />
				</div>
			</div>
		</div>
	);
}
