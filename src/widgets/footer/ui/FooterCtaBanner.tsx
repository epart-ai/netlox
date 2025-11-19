"use client";

import { usePathname } from "next/navigation";

import { isPathnameMatched } from "@/shared/lib/utils";
import { BackgroundImage } from "@/shared/ui/display";
import { Button, ButtonBox } from "@/shared/ui/shadcn";

import { hiddenCtaPaths } from "../model/ctaVisibility";

export const FooterCtaBanner = () => {
	const pathname = usePathname();
	if (pathname && isPathnameMatched(pathname, hiddenCtaPaths)) {
		return null;
	}

	return (
		<div className="bg-gradient-to-b from-blue-100/15 to-blue-60/15">
			<div className="wrapper py-15 md:py-25 lg:py-40">
				<div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-blue-40 to-blue-60 px-4 py-10 lg:py-20">
					<BackgroundImage
						opacity="50"
						className="z-0 mix-blend-multiply"
						src="/images/common/bg_banner.png"
					/>

					<div className="text-center">
						<strong className="title-36 lg:title-44">
							Ready to 10× Your Performance?
						</strong>

						<p className="paragraph-16 mt-4 lg:paragraph-18 lg:mt-8">
							Get in touch with our engineers <br />
							or request a live demo to see NetLOX in action.
						</p>
						<ButtonBox className="mt-7 lg:mt-15">
							<Button variant="white">Request Demo</Button>
							<Button variant="secondary">Contact Sales</Button>
						</ButtonBox>
					</div>
				</div>
			</div>
		</div>
	);
};
