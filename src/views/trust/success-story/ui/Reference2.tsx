import Image from "next/image";

import { DataCard, DataList, Reveal } from "@/shared/ui/display";

export const Reference2 = () => {
	const cardData = [
		{
			title: "Challenge",
			icon: "/images/trust/icon_success-story_reference1.svg",
			footer: (
				<DataList
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
			icon: "/images/trust/icon_success-story_reference2.svg",
			footer: (
				<DataList
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
			icon: "/images/trust/icon_success-story_reference3.svg",
			footer: (
				<DataList
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
			<div className="flex flex-col items-start gap-10 md:flex-row lg:gap-20">
				<div className="w-full md:flex-1">
					<Image
						src="/images/trust/img_success-story_reference1.jpg"
						alt="Success Story Content 1"
						className="size-full overflow-hidden rounded-2xl object-cover"
						width={500}
						height={500}
					/>
				</div>
				<div className="w-full md:flex-1">
					<DataCard data={cardData} orientation="vertical" />
				</div>
			</div>
		</Reveal>
	);
};
