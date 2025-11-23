import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

import { getCurrentSession } from "../api/resetPassword.api";

export type CurrentSessionData = Awaited<ReturnType<typeof getCurrentSession>>;

export function useCurrentSessionQuery(
	options?: UseQueryOptions<CurrentSessionData, Error>,
) {
	return useQuery<CurrentSessionData, Error>({
		queryKey: ["auth", "session"],
		queryFn: getCurrentSession,
		...options,
	});
}
