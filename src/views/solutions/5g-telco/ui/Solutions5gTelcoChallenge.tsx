import type { ThemeColor } from "@/shared/model/types";
import { sectionTitleLg } from "@/shared/styles/snippets";
import { DataCard, Reveal } from "@/shared/ui/display";

interface Props {
	themeColor: ThemeColor;
}

export const Solutions5gTelcoChallenge = ({ themeColor }: Props) => {
	const challengeCardData = [
		{
			title: "Complex Protocols",
			description: (
				<>
					5G cores require highly specialized protocols <br />
					like SCTP, GTP-U, and PFCP, which standard LBs <br />
					fail to handle.
				</>
			),
			image: "/images/solutions/icon_5g-telco_challenge1.svg",
		},
		{
			title: "Five Nines Reliability",
			description: (
				<>
					Carrier-grade requires 99.999% uptime, <br />
					zero packet loss during failover, and &lt;100µs latency.
				</>
			),
			image: "/images/solutions/icon_5g-telco_challenge2.svg",
		},
		{
			title: "Network Slicing & MEC",
			description:
				"Must support multi-access edge computing (MEC) and network slicing with guaranteed QoS.",
			image: "/images/solutions/icon_5g-telco_challenge3.svg",
		},
	];

	return (
		<Reveal delayMs={300}>
			<h3 className={sectionTitleLg}>The Challenge: Telco Demands</h3>
			<DataCard
				data={challengeCardData}
				enableHover={true}
				colors={themeColor}
			/>
		</Reveal>
	);
};
