import { type UseMutationOptions, useMutation } from "@tanstack/react-query";

import { requestPasswordReset } from "../api/forgotPassword.api";
import type { ForgotPasswordPayload } from "./forgot-password.schema";

export type ForgotPasswordVariables = ForgotPasswordPayload & {
	redirectTo?: string;
};
export type ForgotPasswordData = undefined;

export function useForgotPasswordMutation(
	options?: UseMutationOptions<
		ForgotPasswordData,
		Error,
		ForgotPasswordVariables
	>,
) {
	return useMutation<ForgotPasswordData, Error, ForgotPasswordVariables>({
		mutationKey: ["auth", "forgot-password"],
		mutationFn: async ({ email, redirectTo }) =>
			requestPasswordReset(email, { redirectTo }),
		...options,
	});
}
