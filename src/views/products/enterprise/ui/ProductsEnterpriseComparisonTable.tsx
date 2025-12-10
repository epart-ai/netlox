import Image from "next/image";

import { DataTable, Reveal } from "@/shared/ui/display";
import { productsEnterpriseComparisonColumns } from "@/views/products/enterprise/model/productsEnterpriseComparisonColumns";

export const ProductsEnterpriseComparisonTable = () => {
	const tableData = [
		{
			feature: <div className="text-center text-white">Open Source</div>,
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
			basicL4Protocols: (
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
			documentationAccess: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			support: <div className="text-center text-white/75">Community</div>,
			sla: <div className="text-center text-white/75">None</div>,
			advancedDashboard: <div className="text-center text-white/75">CLI</div>,
			highAvailability: <div className="text-center text-white/75">Manual</div>,
			advancedLbAlgorithms: <div className="text-center text-white/75">-</div>,
			securityPatching: <div className="text-center text-white/75">Manual</div>,
			telcoProtocols: <div className="text-center text-white/75">-</div>,
			advancedSecurities: <div className="text-center text-white/75">-</div>,
			customIntegrations: <div className="text-center text-white/75">-</div>,
			onlineTechTransfer: <div className="text-center text-white/75">-</div>,
		},
		{
			feature: <div className="text-center text-white">Enterprise</div>,
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
			basicL4Protocols: (
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
			documentationAccess: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			support: <div className="text-center text-blue-20">8x5 Business</div>,
			sla: <div className="text-center text-blue-20">99.9%</div>,
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
			advancedLbAlgorithms: (
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
			telcoProtocols: <div className="text-center text-white/75">-</div>,
			advancedSecurities: <div className="text-center text-white/75">-</div>,
			customIntegrations: <div className="text-center text-white/75">-</div>,
			onlineTechTransfer: <div className="text-center text-white/75">-</div>,
		},
		{
			feature: <div className="text-center text-white">Premium</div>,
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
			basicL4Protocols: (
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
			documentationAccess: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			support: <div className="text-center text-green-20">24/7 Dedicated</div>,
			sla: <div className="text-center text-green-20">99.99%</div>,
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
			advancedLbAlgorithms: (
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
			telcoProtocols: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			advancedSecurities: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			customIntegrations: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			onlineTechTransfer: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
		},
		{
			feature: <div className="text-center text-white">SaaS</div>,
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
			basicL4Protocols: (
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
			documentationAccess: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			support: <div className="text-center text-blue-20">Managed</div>,
			sla: <div className="text-center text-blue-20">99.9%</div>,
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
			advancedLbAlgorithms: (
				<Image
					className="mx-auto my-[1px] lg:my-0.5"
					src="/images/common/icon_check_blue.svg"
					alt="Check Icon"
					width={16}
					height={16}
				/>
			),
			securityPatching: <div className="text-center text-blue-20">Auto</div>,
			telcoProtocols: <div className="text-center text-white/75">-</div>,
			advancedSecurities: <div className="text-center text-white/75">-</div>,
			customIntegrations: <div className="text-center text-white/75">-</div>,
			onlineTechTransfer: <div className="text-center text-white/75">-</div>,
		},
	];
	return (
		<Reveal>
			<DataTable
				data={tableData}
				columns={productsEnterpriseComparisonColumns}
				selectedRowIndex={1}
				orientation="vertical"
				className="md:[&_.t-table-body]:flex-none md:[&_.t-table-row-box]:min-w-[200px] [&_.t-table-row]:m-auto [&_.t-table-row]:w-full"
			/>
		</Reveal>
	);
};
