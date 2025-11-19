import { Card } from "@/shared/ui/shadcn/card";
import { SignUpInformation, SignUpPanel } from "@/views/user/sign-up/ui";

export default function UserSignupPage() {
	return (
		<div className="grid grid-cols-2 gap-[7.03125vw]">
			<SignUpInformation />
			<Card>
				<SignUpPanel />
			</Card>
		</div>
	);
}
