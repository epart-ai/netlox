import { cardMaxWidth } from "@/shared/styles/snippets";
import { Card } from "@/shared/ui/shadcn/card";
import { VerifyEmailPanel } from "@/views/user/sign-up/verify-email/ui/VerifyEmailPanel";

export default function UserSignupVerifyEmailPage() {
	return (
		<Card className={cardMaxWidth}>
			<VerifyEmailPanel />
		</Card>
	);
}

