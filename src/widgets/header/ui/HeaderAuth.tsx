import Link from "next/link";

import { DIALOGS, ROUTES } from "@/shared/config";
import { useSupabaseClient } from "@/shared/supabase";
import { TextLink } from "@/shared/ui/navigation";
import { Button } from "@/shared/ui/shadcn/button";

type HeaderAuthProps = {
	userEmail: string | null;
};

export function HeaderAuth({ userEmail }: HeaderAuthProps) {
	const supabase = useSupabaseClient();

	const handleLogout = async () => {
		await supabase.auth.signOut();
	};

	return (
		<div className="flex flex-wrap items-center justify-center lg:pointer-events-auto lg:ml-auto">
			{!userEmail ? (
				<>
					<TextLink
						href={{ query: { dialog: DIALOGS.LOGIN } }}
						label="Log In"
						size="lg"
						colors="white75"
						className="font-medium md:mx-5 lg:mx-6"
					/>
					<Button
						asChild
						variant="primary"
						type="button"
						aria-label="Sign up for an account"
						lg={false}
					>
						<Link href={ROUTES.USER_SIGNUP}>Sign Up</Link>
					</Button>
				</>
			) : (
				<>
					<TextLink
						href={{ query: { dialog: DIALOGS.LOGIN } }}
						label={
							<span className="flex items-center gap-1">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="12"
									height="12"
									viewBox="0 0 12 12"
									fill="none"
									aria-hidden="true"
									focusable="false"
								>
									<title>User icon</title>
									<g opacity="0.75">
										<path
											d="M3.0001 3.30078C3.0001 1.64478 4.3441 0.300781 6.0001 0.300781C7.6561 0.300781 9.0001 1.64478 9.0001 3.30078C9.0001 4.95678 7.6561 6.30078 6.0001 6.30078C4.3441 6.30078 3.0001 4.95678 3.0001 3.30078ZM8.4721 6.94278C8.1361 6.85878 7.7701 6.90678 7.4701 7.07478C6.5581 7.57878 5.4421 7.57878 4.5361 7.07478C4.2361 6.90678 3.8701 6.85878 3.5341 6.94278C2.3401 7.24278 1.5061 8.32878 1.5061 9.58278V10.1888C1.5061 10.5728 1.6081 10.9448 1.8001 11.2748C1.9561 11.5388 2.2561 11.7068 2.5741 11.7068H9.4381C9.7561 11.7068 10.0501 11.5448 10.2121 11.2748C10.4041 10.9508 10.5061 10.5728 10.5061 10.1948V9.58878C10.5061 8.34078 9.6721 7.25478 8.4781 6.94878L8.4721 6.94278Z"
											fill="white"
										/>
									</g>
								</svg>
								{userEmail}
							</span>
						}
						size="md"
						colors="white75"
						className="mx-4 font-medium md:mx-5 lg:mx-6"
					/>
					<Button
						variant="primary"
						type="button"
						aria-label="Log out from the account"
						lg={false}
						onClick={handleLogout}
					>
						Log Out
					</Button>
				</>
			)}{" "}
		</div>
	);
}
