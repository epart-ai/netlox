"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/shared/lib/utils";
import { cardContentSpace } from "@/shared/styles/snippets";
import { Button } from "@/shared/ui/shadcn/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/shared/ui/shadcn/form";
import { Input } from "@/shared/ui/shadcn/input";

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, error, data]);

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
		return <p className="text-slate-300">프로필을 불러오는 중...</p>;
	}

	if (state.status === "error") {
		return (
			<div className="space-y-4 rounded-lg border border-rose-900/60 bg-rose-950/40 p-6 text-rose-200">
				<p>프로필을 불러오는 중 문제가 발생했습니다.</p>
				<p className="text-sm text-rose-300/80">{state.message}</p>
				<button
					type="button"
					onClick={() => router.push("/user/login")}
					className="rounded bg-rose-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600"
				>
					로그인 페이지로 이동
				</button>
			</div>
		);
	}

	return (
		<section className="space-y-6 rounded-xl border border-slate-800 bg-slate-900/60 p-8 shadow-lg">
			<header className="space-y-2">
				<h2 className="text-2xl font-bold text-white">내 프로필</h2>
				<p className="text-sm text-slate-400">
					Supabase에서 저장한 `profiles` 테이블 데이터를 조회 및 업데이트하는
					예시입니다.
				</p>
			</header>

			<Form {...form}>
				<form
					onSubmit={handleSubmit((values) => {
						setFeedback(null);
						upsertMutate(values);
					})}
					className={cn("", cardContentSpace)}
				>
					<div className="space-y-4">
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
					</div>

					{feedback && <p className="text-sm text-emerald-400">{feedback}</p>}

					<div className="grid grid-cols-2 gap-3">
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
					</div>
				</form>
			</Form>
		</section>
	);
};
