import Image from "next/image";

import { DataTable, Reveal } from "@/shared/ui/display";
import { businessPricingComparisonColumns } from "@/views/business/pricing/model/businessPricingComparisonColumns";

export const BusinessPricingComparisonTable = () => {
	const tableData = [
		{
			feature: <div className="text-center text-white/75">Open Source</div>,
			coreLoadBalancer: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			ebpfDataPlane: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			kubernetesSupport: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			support: <div className="text-white/75/75 text-center">Community</div>,
			advancedDashboard: (
				<div className="text-white/75/75 text-center">CLI</div>
			),
			highAvailability: (
				<div className="text-white/75/75 text-center">Manual</div>
			),
			securityPatching: (
				<div className="text-white/75/75 text-center">Manual</div>
			),
			customDevelopment: <div className="text-white/75/75 text-center">-</div>,
			dedicatedEngineer: <div className="text-white/75/75 text-center">-</div>,
			architectureReview: <div className="text-white/75/75 text-center">-</div>,
			sla: <div className="text-white/75/75 text-center">None</div>,
			responseTime: (
				<div className="text-white/75/75 text-center">Community</div>
			),
			deploymentSupport: (
				<div className="text-white/75/75 text-center">Docs</div>
			),
		},
		{
			feature: <div className="text-center text-white/75">Enterprise</div>,
			coreLoadBalancer: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			ebpfDataPlane: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			kubernetesSupport: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			support: <div className="text-center text-blue-20">Business Hours</div>,
			advancedDashboard: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			highAvailability: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			securityPatching: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			customDevelopment: <div className="text-center text-white/75">-</div>,
			dedicatedEngineer: (
				<div className="text-center text-white/75">Add-on</div>
			),
			architectureReview: (
				<div className="text-center text-white/75">Add-on</div>
			),
			sla: <div className="text-center text-blue-20">99.9%</div>,
			responseTime: <div className="text-center text-blue-20">24H</div>,
			deploymentSupport: <div className="text-center text-blue-20">Remote</div>,
		},
		{
			feature: <div className="text-center text-white/75">Premium</div>,
			coreLoadBalancer: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			ebpfDataPlane: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			kubernetesSupport: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			support: <div className="text-center text-green-20">24/7 Dedicated</div>,
			advancedDashboard: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			highAvailability: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			securityPatching: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			customDevelopment: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			dedicatedEngineer: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			architectureReview: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			sla: <div className="text-center text-green-20">99.99%</div>,
			responseTime: <div className="text-center text-green-20">4H</div>,
			deploymentSupport: (
				<div className="text-center text-green-20">On-site</div>
			),
		},
		{
			feature: <div className="text-center text-white/75">SaaS</div>,
			coreLoadBalancer: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			ebpfDataPlane: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			kubernetesSupport: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			support: <div className="text-center text-blue-20">Managed</div>,
			advancedDashboard: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			highAvailability: <div className="text-center text-blue-20">Auto</div>,
			securityPatching: <div className="text-center text-blue-20">Auto</div>,
			customDevelopment: <div className="text-center text-white/75">-</div>,
			dedicatedEngineer: <div className="text-center text-white/75">-</div>,
			architectureReview: <div className="text-center text-white/75">-</div>,
			sla: <div className="text-center text-blue-20">99.9%</div>,
			responseTime: <div className="text-center text-blue-20">Auto</div>,
			deploymentSupport: (
				<div className="text-center text-blue-20">Managed</div>
			),
		},
	];
	return (
		<Reveal>
			<DataTable
				data={tableData}
				columns={businessPricingComparisonColumns}
				tableClassName="min-w-[650px]"
				selectedRowIndex={1}
				orientation="vertical"
				className="md:[&_.t-table-body]:flex-none md:[&_.t-table-row-box]:min-w-[200px] [&_.t-table-row]:m-auto [&_.t-table-row]:w-full"
			/>
		</Reveal>
	);
};
