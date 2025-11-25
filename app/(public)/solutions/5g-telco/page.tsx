import {
	Solutions5gTelcoCard,
	Solutions5gTelcoIntro,
} from "@/views/solutions/5g-telco/ui";

export default function ProductPremiumPage() {
	const themeColor = "purple";

	return (
		<>
			<Solutions5gTelcoIntro themeColor={themeColor} />
			<Solutions5gTelcoCard themeColor={themeColor} />
		</>
	);
}
