import { ProductsSaasCard, ProductsSaasIntro } from "@/views/products/saas/ui";

export default function ProductSaasPage() {
	const themeColor = "orange";

	return (
		<>
			<ProductsSaasIntro themeColor={themeColor} />
			<ProductsSaasCard themeColor={themeColor} />
		</>
	);
}
