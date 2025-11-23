import { cardMaxWidth } from "@/shared/styles/snippets";
import { Card } from "@/shared/ui/shadcn/card";
import { ResetPasswordForm } from "@/views/user/reset-password/root/ui";

export default function UserResetPasswordPage() {
	return (
		<Card className={cardMaxWidth}>
			<ResetPasswordForm />
		</Card>
	);
}
