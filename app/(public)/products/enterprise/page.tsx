import {
	ProductsEnterpriseCard,
	ProductsEnterpriseIntro,
} from "@/views/products/enterprise/ui";

export default function ProductEnterprisePage() {
	return (
		<>
			<ProductsEnterpriseIntro />
			<div className="mt-[100px]">
				<ProductsEnterpriseCard />
			</div>
		</>
	);
}
