import {
	ProductsPremiumCard,
	ProductsPremiumHead,
} from "@/views/products/premium/ui";

export default function ProductPremiumPage() {
	const themeColor = "purple";

	return (
		<>
			<ProductsPremiumHead themeColor={themeColor} />
			<div className="mt-[100px]">
				<ProductsPremiumCard themeColor={themeColor} />
			</div>
		</>
	);
}
