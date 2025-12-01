import { DataCard, Reveal } from "@/shared/ui/display";

export const ResourceDocumentationGuide = () => {
	const data = [
		{
			title: "Quick Start Guide",
			description: (
				<>
					Deploy your first LoxiLB instance in under 5 minutes. <br />
					Get started with our basic setup for Kubernetes or bare metal.
				</>
			),
			icon: "/images/resource/icon_documentation_guide1.svg",
			link: {
				label: "Read the Guide",
				href: "/files/resource/User Guide for LoxiLB Enterprise v1.0.pdf",
				target: "_blank",
				download: "User Guide for LoxiLB Enterprise v1.0.pdf",
			},
		},
		{
			title: "User & Operator Manuals",
			description: (
				<>
					In-depth guides for configuration, management, <br />
					high availability (HA) setup, and multi-cloud deployments.
				</>
			),
			icon: "/images/resource/icon_documentation_guide2.svg",
			link: {
				label: "View Manuals",
				href: "/files/resource/User Guide for LoxiLB UI v0.8.0.pdf",
				target: "_blank",
				download: "User Guide for LoxiLB UI v0.8.0.pdf",
			},
		},
		{
			title: "Kubernetes Integration",
			description: (
				<>
					Specific documentation for `kube-loxilb`, <br />
					MetalLB replacement, Ingress controller setup, and Gateway API.
				</>
			),
			icon: "/images/resource/icon_documentation_guide3.svg",
			link: {
				label: "Explore K8s Docs",
				href: "https://docs.loxilb.io/latest/",
				target: "_blank",
			},
		},
		{
			title: "API Reference",
			description: (
				<>
					Explore the full NetLOX API for programmatic configuration,
					monitoring, <br />
					and integration with your existing systems.
				</>
			),
			icon: "/images/resource/icon_documentation_guide4.svg",
			link: {
				label: "View API Reference",
				href: "https://app.swaggerhub.com/apis-docs/ADMIN_111/loxilb/1.0.0",
				target: "_blank",
			},
		},
	];

	return (
		<Reveal>
			<DataCard data={data} className="lg:grid-cols-2" />
		</Reveal>
	);
};
