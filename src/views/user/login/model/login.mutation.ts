import { type UseMutationOptions, useMutation } from "@tanstack/react-query";

import { signInWithEmail } from "../api/login.api";
import type { LoginPayload } from "./login.schema";

export type LoginVariables = LoginPayload;
export type LoginData = Awaited<ReturnType<typeof signInWithEmail>>;

export function useLoginMutation(
	options?: UseMutationOptions<LoginData, Error, LoginVariables>,
) {
	return useMutation<LoginData, Error, LoginVariables>({
		mutationKey: ["auth", "login"],
		mutationFn: async (values: LoginVariables) => signInWithEmail(values),
		...options,
	});
}
