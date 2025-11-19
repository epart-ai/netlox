import Image from "next/image";

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
			<div className="">
				<strong className="title-16 text-blue-20 lg:title-18">
					Create Account
				</strong>
				<h3 className="title-36 mt-1.5 lg:title-44 lg:mt-3">
					Join the NetLOX Platform
				</h3>
				<p className="paragraph-16 mt-4 lg:paragraph-18 lg:mt-8">
					Create an account to request your enterprise demo, access technical
					resources, and get support from our expert team.
				</p>
			</div>
			<div className="mt-20">
				<h4 className="title-24 lg:title-40">Join the NetLOX Platform</h4>
				{data.map((item) => (
					<div key={item.title} className="mt-10 flex items-center gap-8">
						<div className="flex size-15 shrink-0 items-center justify-center rounded-md bg-blue-20/15 p-3.5">
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
	);
};
