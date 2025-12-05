"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/shared/config";
import { cn, isPathnameMatched } from "@/shared/lib/utils";
import {
	beforeBackgroundImage,
	gradientBackgroundBlack,
	gradientBackgroundBlue,
	headingTitle,
	paragraphLead,
} from "@/shared/styles/snippets";
import { Reveal } from "@/shared/ui/display";
import { Button, ButtonBox } from "@/shared/ui/shadcn/button";

import { hiddenCtaPaths } from "../model/ctaVisibility";

export const FooterCtaBanner = () => {
	const pathname = usePathname();
	if (pathname && isPathnameMatched(pathname, hiddenCtaPaths)) {
		return null;
	}

	return (
		<div className={gradientBackgroundBlack}>
			<div className="wrapper py-15 md:py-25 lg:py-40">
				<Reveal>
					<div
						className={cn(
							"relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl px-4 py-10 before:bg-[url('/images/common/bg_banner.png')] before:bg-cover before:bg-center before:opacity-50 before:mix-blend-multiply lg:py-20",
							gradientBackgroundBlue,
							beforeBackgroundImage,
						)}
					>
						<div className="text-center">
							<h3 className={headingTitle}>Ready to 10× Your Performance?</h3>
							<p className={paragraphLead}>
								Get in touch with our engineers <br />
								or request a live demo to see NetLOX in action.
							</p>
							<ButtonBox className="mt-7 lg:mt-15">
								<Button asChild variant="white">
									<Link
										href={{
											pathname: ROUTES.BUSINESS_CONTACT,
											query: { help_options: "demo" },
										}}
									>
										<span>Request Demo</span>
									</Link>
								</Button>
								<Button asChild variant="secondary">
									<Link
										href={{
											pathname: ROUTES.BUSINESS_CONTACT,
											query: { help_options: "technical" },
										}}
									>
										<span>Contact Sales</span>
									</Link>
								</Button>
							</ButtonBox>
						</div>
					</div>
				</Reveal>
			</div>
		</div>
	);
};
