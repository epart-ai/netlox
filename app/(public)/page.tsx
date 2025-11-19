import {
	MainFeatures,
	MainHero,
	MainModel,
	MainReport,
	MainSuccess,
} from "@/views/main";

export default function MainPage() {
	return (
		<>
			<MainHero />
			<MainReport />
			<MainFeatures />
			<MainModel />
			<MainSuccess />
		</>
	);
}
