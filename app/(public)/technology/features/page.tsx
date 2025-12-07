import {
	TechnologyFeatureHead,
	TechnologyFeatureIntro,
	TechnologyFeaturePlatform,
} from "@/views/technology/features/ui";

export default function TechnologyFeaturesPage() {
	return (
		<>
			<TechnologyFeatureHead />
			<div className="mt-10 lg:mt-20">
				<TechnologyFeaturePlatform />
			</div>
			<div className="mt-14 lg:mt-[100px]">
				<TechnologyFeatureIntro />
			</div>
		</>
	);
}
