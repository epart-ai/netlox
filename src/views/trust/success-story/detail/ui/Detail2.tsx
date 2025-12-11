import Image from "next/image";

import { imageRounded } from "@/shared/styles/snippets";
import { DataCard, DataList, Reveal } from "@/shared/ui/display";

import { cardWrapper, imageWrapper, layoutContainer } from "../styles/snippets";

export const Reference2 = () => {
	const cardData = [
		{
			title: "Challenge",
			icon: "/images/trust/icon_success-story_detail1.svg",
			footer: (
				<DataList
					variant="subtle"
					data={[
						<>
							A major telco needed to modernize its 5G Core environment while
							moving workloads into a cloud-native architecture. They faced:{" "}
							<br />-{" "}
							<span className="text-white">
								Extremely high TPS requirements
							</span>{" "}
							for 5G control-plane signaling <br />
							 - <span className="text-white">Full SCTP workload support</span>,
							including <span className="text-white">multi-homing</span>, on
							Kubernetes <br />
							 - The need to operate the same architecture in{" "}
							<span className="text-white">public cloud, on-prem</span>, and
							standalone edge sites
						</>,
						"Traditional L4 load balancers lacked SCTP multi-homing support, high-TPS performance, or Kubernetes integration — creating a bottleneck for 5G rollout",
					]}
				/>
			),
		},
		{
			title: "Applied Solution : LoxiLB Premium",
			icon: "/images/trust/icon_success-story_detail2.svg",
			footer: (
				<DataList
					variant="subtle"
					data={[
						<span key="1" className="text-white">
							eBPF-accelerated SCTP and telco-protocol load balancing
						</span>,
						<>
							<span className="text-white">SCTP multi-homing awareness,</span>{" "}
							maintaining resilience across multiple paths
						</>,
						<>
							<span className="text-white">Custom feature extensions</span> for
							5G Core (AMF/SMF/UPF) and inter-DC routing
						</>,
						<>
							<span className="text-white">Unified deployment model</span>{" "}
							across multi-cloud, on-prem, and edge infrastructure
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
					variant="subtle"
					data={[
						<span key="1" className="text-white">
							High TPS at scale
						</span>,
						"True High Availability for SCTP",
						"Enhanced Security",
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
						src="/images/trust/img_success-story_detail2.jpg"
						alt="Success Story Content 1"
						className={imageRounded}
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
