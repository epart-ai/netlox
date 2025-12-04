"use client";

import Link from "next/link";

import { DIALOGS, ROUTES } from "@/shared/config";
import { IconCheck } from "@/shared/ui/icon";
import { Button } from "@/shared/ui/shadcn/button";
import {
	CardDescription,
	CardHeader,
	CardTitle,
	CardWrapper,
} from "@/shared/ui/shadcn/card";

export const SignUpSuccessPanel = () => {
	return (
		<CardWrapper>
			<IconCheck size="80" color="blue50" className="mx-auto" />
			<CardHeader>
				<CardTitle>Sign Up Complete!</CardTitle>
				<CardDescription>
					Your account has been successfully created and verified. You can now
					log in to access your resources.
				</CardDescription>
			</CardHeader>
			<Button asChild className="w-full">
				<Link href={{ pathname: ROUTES.ROOT, query: { dialog: DIALOGS.LOGIN } }}>
					Go to Login
				</Link>
			</Button>
		</CardWrapper>
	);
};

