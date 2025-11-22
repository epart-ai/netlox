import { Card } from "@/shared/ui/shadcn/card";
import {
	BusinessContactForm,
	BusinessContactInformation,
} from "@/views/business/contact/ui";

export default function BusinessContactPage() {
	return (
		<div className="grid grid-cols-1 gap-[7.03125vw] md:grid-cols-2">
			<BusinessContactInformation />
			<Card>
				<BusinessContactForm />
			</Card>
		</div>
	);
}
