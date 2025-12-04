import Image from "next/image";

import { DataCard, DataList, Reveal } from "@/shared/ui/display";

import { cardWrapper, imageWrapper, layoutContainer } from "../styles/snippets";

export const Reference3 = () => {
	const cardData = [
		{
			title: "Problem Statement",
			icon: "/images/trust/icon_success-story_detail1.svg",
			footer: (
				<DataList
					data={[
						<>
							The customer needed{" "}
							<span className="text-white">
								continuous service availability across multiple regions
							</span>
							. Their legacy LB setup couldn’t survive region-wide failures or
							maintain a{" "}
							<span className="text-white">single stable service IP</span>{" "}
							during outages.
						</>,
					]}
				/>
			),
		},
		{
			title: "Applied Solution : LoxiLB Premium",
			icon: "/images/trust/icon_success-story_detail2.svg",
			footer: (
				<DataList
					data={[
						<>
							<span className="text-white">Instant zone-level failover</span>{" "}
							(active/backup LoxiLB pair)
						</>,
						<>
							<span className="text-white">Cross-region failover</span> using
							multi-cloud topology + DNS shift
						</>,
						<>
							<span className="text-white">One consistent external IP</span>{" "}
							that stays valid even during failures
						</>,
						<>
							<span className="text-white">
								Inter-region private networking
							</span>{" "}
							for seamless backend traffic routing
						</>,
					]}
				/>
			),
		},
		{
			title: "Impact",
			icon: "/images/trust/icon_success-story_detail3.svg",
			footer: (
				<DataList
					data={[
						<>
							<span className="text-white">Zero service downtime,</span> even
							during full region failures
						</>,
						<span key="2" className="text-white">
							Failover time reduced from minutes → seconds
						</span>,
						<>
							<span className="text-white">Single global service endpoint</span>
							, no user disruption
						</>,
						<>
							<span className="text-white">Cloud-agnostic scaling</span> across
							regions and providers
						</>,
						<span key="5" className="text-white">
							Enterprise-grade resiliency built on eBPF performance
						</span>,
					]}
				/>
			),
		},
	];

	return (
		<Reveal>
			<div className={layoutContainer}>
				<div className={imageWrapper}>
					<Image
						src="/images/trust/img_success-story_detail3.jpg"
						alt="Success Story Content 1"
						className="size-full overflow-hidden rounded-2xl object-cover"
						width={500}
						height={500}
					/>
				</div>
				<div className={cardWrapper}>
					<DataCard data={cardData} orientation="vertical" />
				</div>
			</div>
		</Reveal>
	);
};
