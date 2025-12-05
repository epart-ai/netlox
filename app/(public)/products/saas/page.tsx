import { ProductsSaasCard, ProductsSaasIntro } from "@/views/products/saas/ui";

export default function ProductSaasPage() {
	const themeColor = "orange";

	return (
		<>
			<ProductsSaasIntro themeColor={themeColor} />
			<div className="mt-14 lg:mt-[100px]">
				<ProductsSaasCard themeColor={themeColor} />
			</div>
		</>
	);
}
