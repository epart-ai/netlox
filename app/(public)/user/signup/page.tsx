import { Card } from "@/shared/ui/shadcn/card";
import { SignUpForm, SignUpInformation } from "@/views/user/sign-up/root/ui";

export default function UserSignupPage() {
	return (
		<div className="grid gap-[7.03125vw] lg:grid-cols-2">
			<SignUpInformation />
			<Card variant="glass">
				<SignUpForm />
			</Card>
		</div>
	);
}
