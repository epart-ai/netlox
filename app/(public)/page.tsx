import {
	MainFeatures,
	MainHero,
	MainModel,
	MainReport,
	MainSuccess,
} from "@/views/main";

export default function Home() {
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
