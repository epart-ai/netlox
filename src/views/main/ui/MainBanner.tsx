import { BackgroundImage } from "@/shared/ui/display";
import { Button, ButtonBox } from "@/shared/ui/shadcn";

export const MainBanner = () => {
	return (
		<div className="bg-gradient-to-b from-blue-100/15 to-blue-20/15">
			<div className="wrapper py-15 lg:py-40">
				<div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-blue-10 to-blue-20 px-4 py-10 lg:py-20">
					<BackgroundImage src="/images/main/bg_banner.png" />

					<div className="text-center">
						<p className="title-36 lg:title-44">
							Ready to 10× Your Performance?
						</p>

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
