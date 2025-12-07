import { cardMaxWidth } from "@/shared/styles/snippets";
import { Card } from "@/shared/ui/shadcn/card";
import { SignUpSuccessPanel } from "@/views/user/sign-up/success/ui/SignUpSuccessPanel";

export default function UserSignupSuccessPage() {
	return (
		<Card variant="glass" className={cardMaxWidth}>
			<SignUpSuccessPanel />
		</Card>
	);
}
