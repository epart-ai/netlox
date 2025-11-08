import {
	MainBanner,
	MainFeatures,
	MainHero,
	MainModel,
	MainReport,
	MainSuccess,
} from "@/pages/main";

export default function Home() {
	return (
		<div>
			<MainHero />
			<MainReport />
			<MainFeatures />
			<MainModel />
			<MainSuccess />
			<MainBanner />
		</div>
	);
}
