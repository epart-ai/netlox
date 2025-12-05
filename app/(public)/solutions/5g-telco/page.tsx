import {
	Solutions5gTelcoChallenge,
	Solutions5gTelcoHead,
	Solutions5gTelcoLoxilb,
} from "@/views/solutions/5g-telco/ui";

export default function ProductPremiumPage() {
	const themeColor = "purple";

	return (
		<>
			<Solutions5gTelcoHead themeColor={themeColor} />
			<div className="mt-10 lg:mt-20">
				<Solutions5gTelcoChallenge themeColor={themeColor} />
			</div>
			<div className="mt-15 lg:mt-[108px]">
				<Solutions5gTelcoLoxilb themeColor={themeColor} />
			</div>
		</>
	);
}
