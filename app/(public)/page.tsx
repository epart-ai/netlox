import {
	RootFeatures,
	RootHero,
	RootModel,
	RootReport,
	RootSuccess,
} from "@/views/root";

export default function RootPage() {
	return (
		<>
			<RootHero />
			<RootReport />
			<RootFeatures />
			<RootModel />
			<RootSuccess />
		</>
	);
}
