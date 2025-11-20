import { RouteDialog } from "@/shared/ui/display";
import { ForgotPasswordForm } from "@/views/user/forgot-password/ui";

export default function UserForgotPasswordDialog() {
	return (
		<RouteDialog>
			<ForgotPasswordForm />
		</RouteDialog>
	);
}
