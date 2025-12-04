import { cardMaxWidth } from "@/shared/styles/snippets";
import { Card } from "@/shared/ui/shadcn/card";
import { ChangePasswordForm } from "@/views/user/profile/password/ui";

export default function ChangePasswordPage() {
	return (
		<Card className={cardMaxWidth}>
			<ChangePasswordForm />
		</Card>
	);
}

