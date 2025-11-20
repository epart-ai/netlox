"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { DIALOGS, ROUTES } from "@/shared/config";
import { FormCheckbox, FormInput } from "@/shared/ui/form";
import { TextLink } from "@/shared/ui/navigation";
import { Button } from "@/shared/ui/shadcn";
import { CardContent, CardHeader, CardTitle } from "@/shared/ui/shadcn/card";

import type { ProfileInput } from "../../profile/model";
import { signUpWithProfile } from "../api/signUp.api";

const PROFILE_FIELDS: Array<{
	key: keyof ProfileInput;
	label: string;
	placeholder?: string;
}> = [
	{ key: "fullname", label: "Full Name *" },
	{ key: "companyname", label: "Company Name *" },
];

export const SignUpForm = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [profile, setProfile] = useState<ProfileInput>({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const isSubmitDisabled = useMemo(() => {
		return (
			loading ||
			!email ||
			password.length < 6 ||
			confirmPassword.length < 6 ||
			password !== confirmPassword
		);
	}, [email, loading, password, confirmPassword]);

	const handleProfileChange = (key: keyof ProfileInput, value: string) => {
		setProfile((prev) => ({
			...prev,
			[key]: value || undefined,
		}));
	};

	const handleSubmit = async () => {
		setError(null);

		if (!email || !password) {
			setError("이메일과 비밀번호를 모두 입력하세요.");
			return;
		}

		router.push(ROUTES.USER_SIGNUP_SUCCESS);
		try {
			setLoading(true);
			const { user } = await signUpWithProfile({
				email,
				password,
				profile,
			});

			if (!user) {
				throw new Error("회원 가입이 정상적으로 완료되지 않았습니다.");
			}
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "회원 가입에 실패했습니다.";
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<CardContent>
			<CardHeader>
				<CardTitle>Create your account</CardTitle>
			</CardHeader>
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					{PROFILE_FIELDS.map(({ key, label }) => (
						<FormInput
							key={key}
							label={label}
							value={(profile[key] as string) ?? ""}
							onChange={(event) => handleProfileChange(key, event.target.value)}
							disabled={loading}
							required
						/>
					))}
				</div>
				<FormInput
					label="Business Email *"
					type="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					disabled={loading}
					required
				/>
				<FormInput
					label="New password *"
					type="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					helperText="Must be at least 8 characters and include a number."
					disabled={loading}
					required
				/>
				<FormInput
					label="Confirm password *"
					type="password"
					value={confirmPassword}
					onChange={(event) => setConfirmPassword(event.target.value)}
					disabled={loading}
					required
				/>
				{error && <p className="text-sm text-red-400">{error}</p>}
				<FormCheckbox
					label={
						<>
							I agree to our{" "}
							<TextLink href={"#"} label="Terms and Conditions" /> and{" "}
							<TextLink href={"#"} label="Privacy Policy" />
						</>
					}
					name="terms"
					size="sm"
				/>
			</div>
			<p className="paragraph-14 text-center">
				A verification link will be sent to your email.
			</p>

			<Button
				variant="primary"
				className="w-full"
				disabled={isSubmitDisabled}
				isLoading={loading}
				onClick={handleSubmit}
			>
				Create Account
			</Button>
			<div className="text-center">
				<p className="paragraph-14 space-x-2">
					<span>Already have an account?</span>
					<TextLink
						href={{ query: { dialog: DIALOGS.LOGIN } }}
						label="Log In"
						scroll={false}
					/>
				</p>
			</div>
		</CardContent>
	);
};
