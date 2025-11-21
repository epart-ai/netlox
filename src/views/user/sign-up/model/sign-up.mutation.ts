import { type UseMutationOptions, useMutation } from "@tanstack/react-query";

import { signUpWithProfile } from "../api/signUp.api";
import type { SignUpPayload } from "./sign-up.schema";

export type SignUpWithProfileVariables = SignUpPayload;
export type SignUpWithProfileData = Awaited<
	ReturnType<typeof signUpWithProfile>
>;

export function useSignUpWithProfileMutation(
	options?: UseMutationOptions<
		SignUpWithProfileData,
		Error,
		SignUpWithProfileVariables
	>,
) {
	return useMutation<SignUpWithProfileData, Error, SignUpWithProfileVariables>({
		mutationKey: ["auth", "sign-up", "with-profile"],
		mutationFn: async (values: SignUpWithProfileVariables) => {
			return signUpWithProfile(values);
		},
		...options,
	});
}
