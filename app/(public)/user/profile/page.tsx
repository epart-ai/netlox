import { Card } from "@/shared/ui/shadcn/card";
import { ProfileForm } from "@/views/user/profile/ui";

export default function UserProfilePage() {
	return (
		<Card className="m-auto w-full max-w-360 lg:max-w-480">
			<ProfileForm />
		</Card>
	);
}
