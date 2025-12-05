import { cardMaxWidth } from "@/shared/styles/snippets";
import { Card } from "@/shared/ui/shadcn/card";
import { ProfileForm } from "@/views/user/profile/root/ui";

export default function UserProfilePage() {
	return (
		<Card variant="glass" className={cardMaxWidth}>
			<ProfileForm />
		</Card>
	);
}
