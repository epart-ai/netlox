import Image from "next/image";
import Link from "next/link";

import { DIALOGS } from "@/shared/config";
import { Button } from "@/shared/ui/shadcn/button";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/ui/shadcn/card";

export const SignUpSuccessPanel = () => {
	return (
		<CardContent>
			<div className="bg-blue-40/ 50 mx-auto flex size-20 items-center justify-center rounded-full p-4.5">
				<Image
					src="/images/common/icon_check_white.svg"
					alt="Check Icon"
					width={44}
					height={44}
					className="size-full"
				/>
			</div>
			<CardHeader>
				<CardTitle>Email verified!</CardTitle>
				<CardDescription>
					Your account has been successfully verified. You can now log in to
					access your resources.
				</CardDescription>
			</CardHeader>
			<Button asChild variant="primary" className="w-full">
				<Link href={{ query: { dialog: DIALOGS.LOGIN } }} replace>
					Go to Login
				</Link>
			</Button>
		</CardContent>
	);
};
