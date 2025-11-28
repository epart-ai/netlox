import Link from "next/link";

import { DIALOGS } from "@/shared/config";
import { IconCheck } from "@/shared/ui/icon";
import { Button } from "@/shared/ui/shadcn/button";
import {
	CardDescription,
	CardHeader,
	CardTitle,
	CardWrapper,
} from "@/shared/ui/shadcn/card";

export const SignUpVerificationPanel = () => {
	return (
		<CardWrapper>
			<IconCheck size="80" color="blue50" className="mx-auto" />
			<CardHeader>
				<CardTitle>Email verified!</CardTitle>
				<CardDescription>
					Your account has been successfully verified. You can now log in to
					access your resources.
				</CardDescription>
			</CardHeader>
			<Button asChild className="w-full">
				<Link href={{ query: { dialog: DIALOGS.LOGIN } }} replace>
					Go to Login
				</Link>
			</Button>
		</CardWrapper>
	);
};
