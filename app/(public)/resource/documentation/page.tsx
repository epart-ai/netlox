import {
	ResourceDocumentationGuide,
	ResourceDocumentationHead,
} from "@/views/resource/documentation/ui";

export default function ResourceDocumentationPage() {
	return (
		<>
			<ResourceDocumentationHead />
			<div className="mt-18">
				<ResourceDocumentationGuide />
			</div>
		</>
	);
}
