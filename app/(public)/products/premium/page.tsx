import {
	ProductsPremiumCard,
	ProductsPremiumIntro,
} from "@/views/products/premium/ui";

export default function ProductPremiumPage() {
	const themeColor = "purple";

	return (
		<>
			<ProductsPremiumIntro themeColor={themeColor} />
			<div className="mt-[100px]">
				<ProductsPremiumCard themeColor={themeColor} />
			</div>
		</>
	);
}
