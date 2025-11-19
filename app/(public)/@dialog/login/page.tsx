import { RouteDialog } from "@/shared/ui/overlays";
import { LoginPanel } from "@/views/user/login/ui";

export default function UserLoginDialog() {
	return (
		<RouteDialog>
			<LoginPanel />
		</RouteDialog>
	);
}
