import { sectionTitle } from "@/shared/styles/snippets";
import { DataCard, DataList, DataTable, Reveal } from "@/shared/ui/display";

import { technologyPerformanceIngressColumns } from "../model/technologyPerformanceIngressColumns";

export const TechnologyPerformanceIngress = () => {
	const tableData = [
		{
			metric: "LoxiLB (eBPF)",
			requestsPerSecond: "100K",
			sslHandshakesPerSecond: "10K/s",
			memoryPerConnection: "4KB",
			configReload: "< 100ms",
		},
		{
			metric: "NGINX",
			requestsPerSecond: "50K",
			sslHandshakesPerSecond: "5K/s",
			memoryPerConnection: "12KB",
			configReload: "500ms+",
		},
		{
			metric: "HAProxy",
			requestsPerSecond: "80K",
			sslHandshakesPerSecond: "8K/s",
			memoryPerConnection: "8KB",
			configReload: "200ms",
		},
	];

	const data = [
		{
			title: "Test Environment Details",
			icon: "/images/technology/icon_performance_ingress1.svg",
			footer: (
				<DataList
					variant="subtle"
					data={[
						<>
							<span className="font-medium text-white">Infra</span> : k3s
							v1.30.6 w/ Flannel CNI
						</>,
						<>
							<span className="font-medium text-white">Nodes</span> : 3x Master,
							3x Worker (4 vCPU, 4GB RAM)
						</>,
						<>
							<span className="font-medium text-white">Client</span> : 1x Client
							(8 vCPU, 4GB RAM)
						</>,
						<>
							<span className="font-medium text-white">Tools</span> : iperf3,
							go-wrk, netperf
						</>,
					]}
				/>
			),
		},
		{
			title: "Scaling Characteristics",
			icon: "/images/technology/icon_performance_ingress2.svg",
			footer: (
				<DataList
					variant="subtle"
					data={[
						<>
							<span className="font-medium text-white">CPU Scaling</span> :
							Linear (1 Core: 50K req/s, 8 Cores: 400K req/s)
						</>,
						<>
							<span className="font-medium text-white">Memory</span> : 50MB Base
						</>,
						<>
							<span className="font-medium text-white">Per 10K Conns</span> :
							+20MB Memory
						</>,
						<>
							<span className="font-medium text-white">Max Tested</span> : 2M
							Conns @ 1GB RAM
						</>,
					]}
				/>
			),
		},
	];

	return (
		<Reveal>
			<h3 className={sectionTitle}>Ingress Controller Comparison</h3>
			<DataTable
				data={tableData}
				columns={technologyPerformanceIngressColumns}
				selectedRowIndex={0}
				orientation="vertical"
			/>
			<div className="mt-15">
				<DataCard data={data} colors="blue" className="lg:grid-cols-2" />
			</div>
		</Reveal>
	);
};
