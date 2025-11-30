import Image from "next/image";

import { cn } from "@/shared/lib/utils";
import { cardWrapperSpace, iconBadgeLarge } from "@/shared/styles/snippets";
import { PageHead } from "@/views/_shared/ui/PageHead";

export const SignUpInformation = () => {
	const data = [
		{
			title: "Enterprise Demo Access",
			description:
				"Get hands-on with a free, guided demo of our enterprise features.",
			image: "/images/user/icon_signup1.svg",
		},
		{
			title: "Priority Technical Support",
			description:
				"Get faster responses from our engineering team for your technical questions.",
			image: "/images/user/icon_signup2.svg",
		},
		{
			title: "Exclusive Resources",
			description:
				"Access whitepapers, benchmark reports, and case studies reserved for members.",
			image: "/images/user/icon_signup3.svg",
		},
	];
	return (
		<div>
			<PageHead
				eyebrow="Create Account"
				title="Join the NetLOX Platform"
				description={
					<>
						Create an account to request your enterprise demo, access technical
						resources, and get support from our expert team.
					</>
				}
				align="left"
			/>
			<div className="mt-20">
				<h4 className="title-24 lg:title-40">Join the NetLOX Platform</h4>
				<div className={cn("mt-10", cardWrapperSpace)}>
					{data.map((item) => (
						<div key={item.title} className="flex items-center gap-8">
							<div className={iconBadgeLarge}>
								<Image
									src={item.image}
									alt={item.title}
									width={32}
									height={32}
									className="size-full"
								/>
							</div>
							<div className="space-y-2">
								<h4 className="title-16">{item.title}</h4>
								<p className="paragraph-14">{item.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
