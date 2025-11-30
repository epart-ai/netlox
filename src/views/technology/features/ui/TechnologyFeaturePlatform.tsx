import { DataCard, DataList, Reveal } from "@/shared/ui/display";

export const TechnologyFeaturePlatform = () => {
	const data = [
		{
			title: "eBPF-Powered Data Plane",
			image: "/images/technology/icon_features_platform1.svg",
			footer: (
				<DataList
					data={[
						"Kernel bypass for max performance",
						"Programmable without kernel mods",
						"Zero-copy packet processing",
						"Linear scaling with CPU cores",
					]}
				/>
			),
		},
		{
			title: "L4/L7 Capabilities",
			image: "/images/technology/icon_features_platform2.svg",
			footer: (
				<DataList
					data={[
						"TCP, UDP, SCTP, QUIC",
						"HTTP/2, H/3, gRPC, WebSocket",
						"Session persistence & rate limiting",
						"SSL/TLS Offloading",
					]}
				/>
			),
		},
		{
			title: "",
			image: "/images/technology/icon_features_platform3.svg",
			footer: (
				<DataList
					data={[
						"ServiceType=LoadBalancer",
						"Ingress & Gateway API v1.0",
						"kube-proxy replacement",
						"Multi-cluster networking",
					]}
				/>
			),
		},
		{
			title: "",
			image: "/images/technology/icon_features_platform4.svg",
			footer: (
				<DataList
					data={[
						"Active-Active clustering",
						"Hitless failover (<5 seconds)",
						"State synchronization",
						"Multi-AZ & Cross-Cloud",
					]}
				/>
			),
		},
		{
			title: "",
			image: "/images/technology/icon_features_platform5.svg",
			footer: (
				<DataList
					data={[
						"Stateful firewall integration",
						"IPsec & WireGuard tunnels",
						"DDoS protection",
						"Audit logging (SOC 2 planned)",
					]}
				/>
			),
		},
		{
			title: "",
			image: "/images/technology/icon_features_platform6.svg",
			footer: (
				<DataList
					data={[
						"AWS SaaS Marketplace",
						"On-premise bare metal",
						"Kubernetes DaemonSet",
						"VMs, Docker, Edge devices",
					]}
				/>
			),
		},
	];
	return (
		<Reveal>
			<DataCard data={data} />
		</Reveal>
	);
};
