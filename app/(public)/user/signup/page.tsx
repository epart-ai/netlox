import { Card } from "@/shared/ui/shadcn/card";
import { SignUpForm, SignUpInformation } from "@/views/user/sign-up/root/ui";

export default function UserSignupPage() {
	return (
		<div className="grid grid-cols-2 gap-[7.03125vw]">
			<SignUpInformation />
			<Card>
				<SignUpForm />
			</Card>
		</div>
	);
}
