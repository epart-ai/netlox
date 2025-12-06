"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { DIALOGS } from "@/shared/config";
import { useActionStatus } from "@/shared/lib/useActionStatus";
import { useSupabaseClient } from "@/shared/supabase";
import { Button, ButtonBox } from "@/shared/ui/shadcn/button";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardWrapper,
} from "@/shared/ui/shadcn/card";
import { Input } from "@/shared/ui/shadcn/input";
import { Label } from "@/shared/ui/shadcn/label";
import { Spinner } from "@/shared/ui/shadcn/spinner";

import { useCurrentUserProfileQuery } from "../model/profile.query";

export function ProfileForm() {
	const supabase = useSupabaseClient();
	const { data, isLoading, error } = useCurrentUserProfileQuery();
	const { fail, status } = useActionStatus();

	const [userEmail, setUserEmail] = useState<string | null>(null);

	// 사용자 이메일 가져오기
	useEffect(() => {
		supabase.auth.getUser().then(({ data }) => {
			setUserEmail(data.user?.email ?? null);
		});
	}, [supabase]);

	if (!data || isLoading) {
		return <Spinner size="lg" />;
	}

	if (status.type === "error") {
		fail(status.message, "프로필 정보를 불러오지 못했습니다.");
	}

	if (error) {
		fail(error.message, "프로필 정보를 불러오지 못했습니다.");
	}

	return (
		<CardWrapper>
			<CardHeader>
				<CardTitle>My Account Information</CardTitle>
				<CardDescription>
					Account information cannot be modified. <br />
					If you need to make changes, please withdraw your account and sign up
					again.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<div className="space-y-2">
					<Label className="flex justify-between gap-2">Full Name</Label>
					<Input readOnly value={data.fullname ?? ""} />
				</div>
				<div className="space-y-2">
					<Label className="flex justify-between gap-2">Company Name</Label>
					<Input readOnly value={data.companyname ?? ""} />
				</div>
				<div className="space-y-2">
					<Label className="flex justify-between gap-2">Business Email</Label>
					<Input readOnly value={userEmail ?? ""} />
				</div>
			</CardContent>
			<ButtonBox orientation="vertical">
				<Button asChild variant="primary" className="w-full">
					<Link
						href={{ query: { dialog: DIALOGS.USER_PROFILE_PASSWORD } }}
						replace
						scroll={false}
					>
						Change Password
					</Link>
				</Button>
				<Button asChild variant="secondary" className="w-full">
					<Link
						href={{ query: { dialog: DIALOGS.USER_PROFILE_WITHDRAW } }}
						replace
						scroll={false}
					>
						Withdraw Account
					</Link>
				</Button>
			</ButtonBox>
		</CardWrapper>
	);
}
