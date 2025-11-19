import { RouteDialog } from "@/shared/ui/display";
import { ForgotPasswordPanel } from "@/views/user/forgot-password/ui";

export default function UserForgotPasswordDialog() {
	return (
		<RouteDialog>
			<ForgotPasswordPanel />
		</RouteDialog>
	);
}


