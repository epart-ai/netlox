"use client";

import { IconCheck } from "@/shared/ui/icon";
import { TextLink } from "@/shared/ui/navigation";
import {
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/ui/shadcn/card";

export function ForgotPasswordSuccess() {
	return (
		<>
			<IconCheck size="80" color="blue50" className="mx-auto" />
			<CardHeader>
				<CardTitle>Check your email</CardTitle>
				<CardDescription>
					If an account exists for{" "}
					<TextLink href="mailto:name@domain.com" label="name@domain.com" />,
					<br />
					you’ll receive a reset link.
				</CardDescription>
			</CardHeader>
		</>
	);
}
