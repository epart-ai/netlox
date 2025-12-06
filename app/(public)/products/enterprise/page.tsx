import {
	ProductsEnterpriseBenchmarksChwbl,
	ProductsEnterpriseBenchmarksHead,
	ProductsEnterpriseBenchmarksIncluster,
	ProductsEnterpriseBenchmarksIngress,
	ProductsEnterpriseComparisonHead,
	ProductsEnterpriseComparisonTable,
	ProductsEnterpriseIncluded,
	ProductsEnterpriseIntro,
	ProductsEnterpriseProduction,
} from "@/views/products/enterprise/ui";

export default function ProductEnterprisePage() {
	return (
		<>
			<ProductsEnterpriseIntro />
			<div className="mt-14 lg:mt-[100px]">
				<ProductsEnterpriseIncluded />
				<div className="mt-15 lg:mt-[108px]">
					<ProductsEnterpriseProduction />
				</div>
			</div>
			<div className="mt-20 lg:mt-[160px]">
				<ProductsEnterpriseBenchmarksHead />
				<div className="mt-[80px]">
					<ProductsEnterpriseBenchmarksIncluster />
				</div>
				<div className="mt-14 lg:mt-[100px]">
					<ProductsEnterpriseBenchmarksIngress />
				</div>
				<div className="mt-14 lg:mt-[100px]">
					<ProductsEnterpriseBenchmarksChwbl />
				</div>
			</div>
			<div className="mt-20 lg:mt-[160px]">
				<ProductsEnterpriseComparisonHead />
				<div className="mt-[80px]">
					<ProductsEnterpriseComparisonTable />
				</div>
			</div>
		</>
	);
}
