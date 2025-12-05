import { cardMaxWidth } from "@/shared/styles/snippets";
import { Card } from "@/shared/ui/shadcn/card";
import { WithdrawAccountForm } from "@/views/user/profile/withdraw/ui";

export default function WithdrawAccountPage() {
	return (
		<Card variant="glass" className={cardMaxWidth}>
			<WithdrawAccountForm />
		</Card>
	);
}
