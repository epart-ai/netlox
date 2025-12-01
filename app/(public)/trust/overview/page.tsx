import {
	TrustOverviewHead,
	TrustOverviewHighlight,
	TrustStoriesHead,
	TrustStoriesInnovators,
	TrustUseCaseHead,
	TrustUseCaseIndustry,
	TrustValidationEcosystem,
	TrustValidationHead,
} from "@/views/trust/root/ui";

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
				<TrustStoriesHead />
				<div className="mt-20">
					<TrustStoriesInnovators />
				</div>
			</div>
			<div>
				<TrustUseCaseHead />
				<div className="mt-20">
					<TrustUseCaseIndustry />
				</div>
			</div>
			<div>
				<TrustValidationHead />
				<div className="mt-20">
					<TrustValidationEcosystem />
				</div>
			</div>
		</div>
	);
}
