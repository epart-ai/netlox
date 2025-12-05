import { Suspense } from "react";

import { Card } from "@/shared/ui/shadcn/card";
import {
	BusinessContactForm,
	BusinessContactInformation,
} from "@/views/business/contact/ui";

export default function BusinessContactPage() {
	return (
		<div className="grid gap-20 lg:grid-cols-2 lg:gap-[7.03125vw]">
			<BusinessContactInformation />
			<Card>
				<Suspense fallback={null}>
					<BusinessContactForm />
				</Suspense>
			</Card>
		</div>
	);
}
