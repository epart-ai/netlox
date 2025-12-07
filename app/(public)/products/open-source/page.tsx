import {
	ProductsOpenSourceCard,
	ProductsOpenSourceIntro,
} from "@/views/products/open-source/ui";

export default function ProductOpenSourcePage() {
	const themeColor = "green";

	return (
		<>
			<ProductsOpenSourceIntro themeColor={themeColor} />
			<div className="mt-14 lg:mt-[100px]">
				<ProductsOpenSourceCard themeColor={themeColor} />
			</div>
		</>
	);
}
