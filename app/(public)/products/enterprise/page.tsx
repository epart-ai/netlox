import {
	ProductsEnterpriseCard,
	ProductsEnterpriseHead,
} from "@/views/products/enterprise/ui";

export default function ProductEnterprisePage() {
	const themeColor = "blue";
	return (
		<>
			<ProductsEnterpriseHead themeColor={themeColor} />
			<div className="mt-[100px]">
				<ProductsEnterpriseCard themeColor={themeColor} />
			</div>
		</>
	);
}
