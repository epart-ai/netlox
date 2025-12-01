import {
	TechnologyFeatureHead,
	TechnologyFeatureIntro,
	TechnologyFeaturePlatform,
} from "@/views/technology/features/ui";

export default function TechnologyFeaturesPage() {
	return (
		<>
			<TechnologyFeatureHead />
			<div className="mt-20">
				<TechnologyFeaturePlatform />
			</div>
			<div className="mt-[100px]">
				<TechnologyFeatureIntro />
			</div>
		</>
	);
}
