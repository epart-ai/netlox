import { type UseMutationOptions, useMutation } from "@tanstack/react-query";

import { updatePassword } from "../api/resetPassword.api";
import type { ResetPasswordPayload } from "./reset-password.schema";

export type ResetPasswordVariables = ResetPasswordPayload;
export type ResetPasswordData = void;

export function useResetPasswordMutation(
	options?: UseMutationOptions<
		ResetPasswordData,
		Error,
		ResetPasswordVariables
	>,
) {
	return useMutation<ResetPasswordData, Error, ResetPasswordVariables>({
		mutationKey: ["auth", "reset-password"],
		mutationFn: async ({ password }) => updatePassword(password),
		...options,
	});
}
