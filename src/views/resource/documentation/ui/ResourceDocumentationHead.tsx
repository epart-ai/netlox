import { Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui";

export function ResourceDocumentationHead() {
	return (
		<Reveal rootMargin="-25% 0px -25% 0px" threshold={0}>
			<PageHead
				eyebrow="Documentation"
				title="Technical Documentation"
				description={
					<>
						Find all the technical documentation, user manuals, operator guides,
						<br />
						and API references you need to get the most out of NetLOX.
					</>
				}
				align="center"
			/>
		</Reveal>
	);
}
