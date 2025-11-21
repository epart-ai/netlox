import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

import { getCurrentUserProfile } from "../api/profile.api";
import type { UserProfile } from "./profile.type";

export type CurrentUserProfileData = UserProfile | null;

export function useCurrentUserProfileQuery(
	options?: UseQueryOptions<CurrentUserProfileData, Error>,
) {
	return useQuery<CurrentUserProfileData, Error>({
		queryKey: ["profile", "current"],
		queryFn: getCurrentUserProfile,
		...options,
	});
}
