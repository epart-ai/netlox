import { ProductsSaasCard, ProductsSaasHead } from "@/views/products/saas/ui";

export default function ProductSaasPage() {
	const themeColor = "orange";

	return (
		<>
			<ProductsSaasHead themeColor={themeColor} />
			<div className="mt-[100px]">
				<ProductsSaasCard themeColor={themeColor} />
			</div>
		</>
	);
}
