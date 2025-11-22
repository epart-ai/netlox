import { type UseMutationOptions, useMutation } from "@tanstack/react-query";

import { signOut, upsertCurrentUserProfile } from "../api/profile.api";
import { type ProfileFormValues, toProfilePayload } from "./profile.schema";
import type { UserProfile } from "./profile.type";

export type UpsertProfileVariables = ProfileFormValues;
export type UpsertProfileData = UserProfile;

export function useUpsertProfileMutation(
	options?: UseMutationOptions<
		UpsertProfileData,
		Error,
		UpsertProfileVariables
	>,
) {
	return useMutation<UpsertProfileData, Error, UpsertProfileVariables>({
		mutationKey: ["profile", "upsert"],
		mutationFn: async (values: UpsertProfileVariables) =>
			upsertCurrentUserProfile(toProfilePayload(values)),
		...options,
	});
}

export type SignOutData = undefined;
export function useSignOutMutation(
	options?: UseMutationOptions<SignOutData, Error, void>,
) {
	return useMutation<SignOutData, Error, void>({
		mutationKey: ["auth", "sign-out"],
		mutationFn: async () => signOut(),
		...options,
	});
}
