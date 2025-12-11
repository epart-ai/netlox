import Image from "next/image";

import { imageRounded } from "@/shared/styles/snippets";
import { DataCard, DataList, Reveal } from "@/shared/ui/display";

import { cardWrapper, imageWrapper, layoutContainer } from "../styles/snippets";

export const Reference1 = () => {
	const cardData = [
		{
			title: "Problem Statement",
			icon: "/images/trust/icon_success-story_detail1.svg",
			footer: (
				<DataList
					variant="subtle"
					data={[
						"A private-5G operator needed to launch a cloud-native 5G Core with :",
						<>
							<span className="text-white">
								High TPS SCTP signaling performance
							</span>
							(AMF/SMF)
						</>,
						<>
							Stable SCTP connectivity inside{" "}
							<span className="text-white">Kubernetes</span>
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
					variant="subtle"
					data={[
						"Carrier-grade SCTP load balancing",
						<>
							<span className="text-white">
								eBPF-based low-latency data plane
							</span>{" "}
							for AMF/SMF signaling
						</>,
						"Kubernetes-native deployment and CRD integration",
						"Security enhancements for 5G control-plane workloads",
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
						<>
							<span className="text-white">
								High performance SCTP signaling
							</span>{" "}
							with near line-rate throughput
						</>,
						<>
							<span className="text-white">Reliable 5G Core behavior</span>{" "}
							under node restart or pod rescheduling
						</>,
						<span key="3" className="text-white">
							Consistent deployment across MEC/on-prem environments
						</span>,
						<>
							<span className="text-white">Stronger security</span> for
							mission-critical 5G control-plane traffic
						</>,
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
						src="/images/trust/img_success-story_detail1.jpg"
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
