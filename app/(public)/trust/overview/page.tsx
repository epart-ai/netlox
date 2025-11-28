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
	const themeColor = "blue";
	return (
		<div className="space-y-[160px]">
			<div>
				<TrustOverviewHead themeColor={themeColor} />
				<div className="mt-20">
					<TrustOverviewHighlight />
				</div>
			</div>
			<div>
				<TrustStoriesHead themeColor={themeColor} />
				<div className="mt-20">
					<TrustStoriesInnovators themeColor={themeColor} />
				</div>
			</div>
			<div>
				<TrustUseCaseHead themeColor={themeColor} />
				<div className="mt-20">
					<TrustUseCaseIndustry themeColor={themeColor} />
				</div>
			</div>
			<div>
				<TrustValidationHead themeColor={themeColor} />
				<div className="mt-20">
					<TrustValidationEcosystem themeColor={themeColor} />
				</div>
			</div>
		</div>
	);
}
