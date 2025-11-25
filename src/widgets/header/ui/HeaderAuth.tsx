import Image from "next/image";
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
								<Image
									src="/images/user/icon_profile.svg"
									alt="User"
									width={12}
									height={12}
								/>
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
