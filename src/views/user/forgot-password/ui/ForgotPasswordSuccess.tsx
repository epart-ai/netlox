"use client";

import Image from "next/image";

import { TextLink } from "@/shared/ui/navigation";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/ui/shadcn/card";

export function ForgotPasswordSuccess() {
	return (
		<CardContent>
			<div className="mx-auto flex size-20 items-center justify-center rounded-full bg-blue-60/50 p-4.5">
				<Image
					src="/images/common/icon_check_white.svg"
					alt="Check Icon"
					width={44}
					height={44}
					className="size-full"
				/>
			</div>
			<CardHeader>
				<CardTitle>Email sent!</CardTitle>
				<CardDescription>
					If an account exists for{" "}
					<TextLink href="mailto:name@domain.com" label="name@domain.com" />,
					<br />
					you’ll receive a reset link.
				</CardDescription>
			</CardHeader>
		</CardContent>
	);
}
