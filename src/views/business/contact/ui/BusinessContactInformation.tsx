import Image from "next/image";
import Link from "next/link";

import { cn } from "@/shared/lib/utils";
import { cardWrapperSpace, iconBadgeLarge } from "@/shared/styles/snippets";
import { DataList } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui/PageHead";

export const BusinessContactInformation = () => {
	const data = [
		{
			title: "Premium Support",
			description: (
				<>
					Access our expert engineers 24/7/365. <br />
					We resolve issues quickly to keep your mission-critical services
					running.
				</>
			),
			image: "/images/business/icon_contact1.svg",
		},
		{
			title: "Cutting-edge Performance",
			description: (
				<>
					Leverage eBPF for the fastest load balancing on the market, <br />
					with 10x the throughput of alternatives like MetalLB.
				</>
			),
			image: "/images/business/icon_contact2.svg",
		},
		{
			title: "Enterprise-Grade Security",
			description: (
				<>
					Integrated security features, from DDoS protection to stateful
					firewalls,
					<br />
					safeguard your infrastructure..
				</>
			),
			image: "/images/business/icon_contact3.svg",
		},
	];
	return (
		<div>
			<PageHead
				eyebrow="Contact"
				title="Contact Our Team"
				description={
					<>
						Contact our team to see how NetLOX&apos;s eBPF-powered load
						balancing can 10x your performance and reduce TCO. Whether
						you&apos;re evaluating options, need a demo, or have technical
						questions, we&apos;re here to help.
					</>
				}
				align="left"
			/>
			<div className="mt-10 space-y-8 lg:mt-20 lg:space-y-10">
				<h4 className="title-24 lg:title-40">Why work with NetLOX?</h4>
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
			<div className="mt-10 lg:mt-20">
				<h4 className="title-24 lg:title-40">Headquarters</h4>
				<DataList
					className="mt-6 lg:mt-10"
					data={[
						<>
							<span className="opacity-1 title-16">General</span> :
							<Link href="mailto:info@netlox.io">info@netlox.io</Link>
						</>,
					]}
				/>
			</div>
		</div>
	);
};
