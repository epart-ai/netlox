"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { DIALOGS } from "@/shared/config";
import { successTextSm } from "@/shared/styles/snippets";
import { Button, ButtonBox } from "@/shared/ui/shadcn/button";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardWrapper,
} from "@/shared/ui/shadcn/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/shared/ui/shadcn/form";
import { Input } from "@/shared/ui/shadcn/input";
import { Spinner } from "@/shared/ui/shadcn/spinner";

import type { UserProfile } from "../model";
import {
	useSignOutMutation,
	useUpsertProfileMutation,
} from "../model/profile.mutation";
import { useCurrentUserProfileQuery } from "../model/profile.query";
import {
	type ProfileFormValues,
	profileFormDefaultValues,
	profileFormSchema,
	toProfileFormValues,
} from "../model/profile.schema";

type ViewState =
	| { status: "loading" }
	| { status: "error"; message: string }
	| { status: "ready"; profile: UserProfile | null };

export const ProfileForm = () => {
	const router = useRouter();
	const [state, setState] = useState<ViewState>({ status: "loading" });
	const [feedback, setFeedback] = useState<string | null>(null);

	const { data, isLoading, error } = useCurrentUserProfileQuery();

	const form = useForm<ProfileFormValues>({
		mode: "onBlur",
		resolver: zodResolver(profileFormSchema),
		defaultValues: profileFormDefaultValues,
	});

	const {
		control,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = form;

	useEffect(() => {
		if (isLoading) {
			setState({ status: "loading" });
			return;
		}
		if (error) {
			setState({
				status: "error",
				message: error.message ?? "프로필 정보를 불러오지 못했습니다.",
			});
			return;
		}
		setState({ status: "ready", profile: data ?? null });
		reset(toProfileFormValues(data ?? null));
	}, [isLoading, error, data, reset]);
	// 위 effect는 폼의 reset을 호출하므로 reset도 의존성에 포함
	// Biome 권고에 따라 누락된 의존성을 추가합니다.
	// (폼 초기화 타이밍은 서버 응답에 연동됨)
	// eslint-disable-next-line @typescript-eslint/no-unused-expressions

	const { mutate: upsertMutate, isPending: isSaving } =
		useUpsertProfileMutation({
			onSuccess: (profile: UserProfile) => {
				setState({ status: "ready", profile });
				reset(toProfileFormValues(profile));
				setFeedback("프로필이 저장되었습니다.");
			},
			onError: (err: Error) => {
				const message =
					err instanceof Error ? err.message : "프로필 저장에 실패했습니다.";
				setFeedback(message);
			},
		});

	const { mutate: signOutMutate } = useSignOutMutation({
		onSuccess: () => {
			router.push("/user/login");
		},
		onError: (err: Error) => {
			const message =
				err instanceof Error ? err.message : "로그아웃에 실패했습니다.";
			setFeedback(message);
		},
	});

	if (state.status === "loading") {
		return <Spinner />;
	}

	if (state.status === "error") {
		return (
			<CardWrapper className="text-center">
				<CardTitle>프로필을 불러오는 중 문제가 발생했습니다.</CardTitle>
				<CardDescription className="text-sm text-rose-300/80">
					{state.message}
				</CardDescription>
				<Button asChild type="button" variant="primary" className="w-full">
					<Link href={{ query: { dialog: DIALOGS.LOGIN } }}>Login</Link>
				</Button>
			</CardWrapper>
		);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit((values) => {
					setFeedback(null);
					upsertMutate(values);
				})}
			>
				<CardWrapper>
					<CardHeader>
						<CardTitle>내 프로필</CardTitle>
						<CardDescription>
							Supabase에서 저장한 `profiles` 테이블 데이터를 조회 및
							업데이트하는 예시입니다.
						</CardDescription>
					</CardHeader>

					<CardContent>
						<FormField
							name="fullname"
							control={control}
							render={({ field }) => (
								<FormItem>
									<FormLabel> Full Name * </FormLabel>
									<FormControl>
										<Input {...field} disabled={isSaving || isSubmitting} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="companyname"
							control={control}
							render={({ field }) => (
								<FormItem>
									<FormLabel> Company Name * </FormLabel>
									<FormControl>
										<Input {...field} disabled={isSaving || isSubmitting} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="etc1"
							control={control}
							render={({ field }) => (
								<FormItem>
									<FormLabel> Etc 1 * </FormLabel>
									<FormControl>
										<Input {...field} disabled={isSaving || isSubmitting} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="etc2"
							control={control}
							render={({ field }) => (
								<FormItem>
									<FormLabel> Etc 2 * </FormLabel>
									<FormControl>
										<Input {...field} disabled={isSaving || isSubmitting} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="etc3"
							control={control}
							render={({ field }) => (
								<FormItem>
									<FormLabel> Etc 3 * </FormLabel>
									<FormControl>
										<Input {...field} disabled={isSaving || isSubmitting} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="etc4"
							control={control}
							render={({ field }) => (
								<FormItem>
									<FormLabel> Etc 4 * </FormLabel>
									<FormControl>
										<Input {...field} disabled={isSaving || isSubmitting} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="etc5"
							control={control}
							render={({ field }) => (
								<FormItem>
									<FormLabel> Etc 5 * </FormLabel>
									<FormControl>
										<Input {...field} disabled={isSaving || isSubmitting} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>

					{feedback && <p className={successTextSm}>{feedback}</p>}

					<ButtonBox>
						<Button
							type="submit"
							variant="primary"
							disabled={isSaving || isSubmitting}
							isLoading={isSaving || isSubmitting}
						>
							Save Changes
						</Button>
						<Button
							type="button"
							onClick={() => signOutMutate()}
							variant="outline"
							disabled={isSaving || isSubmitting}
							isLoading={isSaving || isSubmitting}
						>
							Sign Out
						</Button>
					</ButtonBox>
				</CardWrapper>
			</form>
		</Form>
	);
};
