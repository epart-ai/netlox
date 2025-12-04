import {
	ProductsEnterpriseBenchmarks,
	ProductsEnterpriseComparison,
	ProductsEnterpriseIntro,
	ProductsEnterpriseProduction,
} from "@/views/products/enterprise/ui";

export default function ProductEnterprisePage() {
	return (
		<>
			<ProductsEnterpriseIntro />
			<div className="mt-[100px]">
				<ProductsEnterpriseProduction />
			</div>
			<div className="mt-[160px]">
				<ProductsEnterpriseBenchmarks />
			</div>
			<div className="mt-[160px]">
				<ProductsEnterpriseComparison />
			</div>
		</>
	);
}
