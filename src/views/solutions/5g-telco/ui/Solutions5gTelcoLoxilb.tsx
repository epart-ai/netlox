import type { ThemeColor } from "@/shared/model/types";
import { sectionTitle } from "@/shared/styles/snippets";
import { DataCard, Reveal } from "@/shared/ui/display";

interface Props {
	themeColor: ThemeColor;
}

export const Solutions5gTelcoLoxilb = ({ themeColor }: Props) => {
	const solutionCardData = [
		{
			title: "SCTP Multi-Homing",
			description: (
				<>
					Native SCTP support with multi-homing <br />
					and automatic failover, compliant with 3GPP specs.
				</>
			),
			icon: "/images/solutions/icon_5g-telco_solution1.svg",
		},
		{
			title: "5G Protocol Awareness",
			description: (
				<>
					GTP-U awareness for user plane, PFCP session <br />
					intelligence (N4), and SRv6 support.
				</>
			),
			icon: "/images/solutions/icon_5g-telco_solution2.svg",
		},
		{
			title: "UPF & SCP Load Balancing",
			description: (
				<>
					Acts as a Service Communication Proxy (SCP) <br />
					and provides robust UPF load balancing.
				</>
			),
			icon: "/images/solutions/icon_5g-telco_solution3.svg",
		},
	];

	return (
		<Reveal>
			<h3 className={sectionTitle}>The LoxiLB Solution</h3>
			<DataCard data={solutionCardData} colors={themeColor} />
		</Reveal>
	);
};
