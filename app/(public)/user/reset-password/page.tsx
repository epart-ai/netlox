import { Card } from "@/shared/ui/shadcn/card";
import { ResetPasswordForm } from "@/views/user/reset-password/ui";

export default function UserResetPasswordPage() {
	return (
		<Card className="m-auto w-full max-w-360 lg:max-w-480">
			<ResetPasswordForm />
		</Card>
	);
}
