import { cardMaxWidth } from "@/shared/styles/snippets";
import { Card } from "@/shared/ui/shadcn/card";
import { SignUpVerificationPanel } from "@/views/user/sign-up/verification/ui/SignUpVerificationPanel";

export default function UserSignupSuccessPage() {
	return (
		<Card variant="glass" className={cardMaxWidth}>
			<SignUpVerificationPanel />
		</Card>
	);
}
