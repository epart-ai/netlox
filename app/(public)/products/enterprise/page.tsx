import {
	ProductsEnterpriseCard,
	ProductsEnterpriseIntro,
} from "@/views/products/enterprise/ui";

export default function ProductEnterprisePage() {
	const themeColor = "blue";
	return (
		<>
			<ProductsEnterpriseIntro themeColor={themeColor} />
			<ProductsEnterpriseCard themeColor={themeColor} />
		</>
	);
}
