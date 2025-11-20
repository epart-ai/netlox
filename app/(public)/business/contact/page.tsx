import { Card } from "@/shared/ui/shadcn/card";
import {
	BusinessContactForm,
	BusinessContactInformation,
} from "@/views/business/_contact/ui";

export default function BusinessContactPage() {
	return (
		<div className="grid grid-cols-2 gap-[7.03125vw]">
			<BusinessContactInformation />
			<Card>
				<BusinessContactForm />
			</Card>
		</div>
	);
}
