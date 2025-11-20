import { RouteDialog } from "@/shared/ui/overlays";
import { LoginForm } from "@/views/user/login/ui";

export default function UserLoginDialog() {
	return (
		<RouteDialog>
			<LoginForm />
		</RouteDialog>
	);
}
