import {
	ProductsOpenSourceCard,
	ProductsOpenSourceHead,
} from "@/views/products/open-source/ui";

export default function ProductOpenSourcePage() {
	const themeColor = "green";

	return (
		<>
			<ProductsOpenSourceHead themeColor={themeColor} />
			<div className="mt-[100px]">
				<ProductsOpenSourceCard themeColor={themeColor} />
			</div>
		</>
	);
}
