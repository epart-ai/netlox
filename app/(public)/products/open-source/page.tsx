import {
	ProductsOpenSourceCard,
	ProductsOpenSourceIntro,
} from "@/views/products/open-source/ui";

export default function ProductOpenSourcePage() {
	const themeColor = "green";

	return (
		<>
			<ProductsOpenSourceIntro themeColor={themeColor} />
			<ProductsOpenSourceCard themeColor={themeColor} />
		</>
	);
}
