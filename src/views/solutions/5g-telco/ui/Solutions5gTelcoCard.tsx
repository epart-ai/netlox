import type { ThemeColor } from "@/shared/model/types";
import { sectionTitleLg } from "@/shared/styles/snippets";
import { DataCard, Reveal } from "@/shared/ui/display";

interface Props {
	themeColor: ThemeColor;
}

export const Solutions5gTelcoCard = ({ themeColor }: Props) => {
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

	const solutionCardData = [
		{
			title: "SCTP Multi-Homing",
			description: (
				<>
					Native SCTP support with multi-homing <br />
					and automatic failover, compliant with 3GPP specs.
				</>
			),
			image: "/images/solutions/icon_5g-telco_solution1.svg",
		},
		{
			title: "5G Protocol Awareness",
			description: (
				<>
					GTP-U awareness for user plane, PFCP session <br />
					intelligence (N4), and SRv6 support.
				</>
			),
			image: "/images/solutions/icon_5g-telco_solution2.svg",
		},
		{
			title: "UPF & SCP Load Balancing",
			description: (
				<>
					Acts as a Service Communication Proxy (SCP) <br />
					and provides robust UPF load balancing.
				</>
			),
			image: "/images/solutions/icon_5g-telco_solution3.svg",
		},
	];

	return (
		<>
			<div className="mt-20">
				<Reveal delayMs={300}>
					<h3 className={sectionTitleLg}>The Challenge: Telco Demands</h3>
					<DataCard
						data={challengeCardData}
						enableHover={true}
						colors={themeColor}
					/>
				</Reveal>
			</div>
			<div className="mt-[108px]">
				<Reveal delayMs={300}>
					<h3 className={sectionTitleLg}>The LoxiLB Solution</h3>
					<DataCard
						data={solutionCardData}
						enableHover={true}
						colors={themeColor}
					/>
				</Reveal>
			</div>
		</>
	);
};
