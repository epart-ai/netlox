import { DataCard, Reveal } from "@/shared/ui/display";
import { CardDescription } from "@/shared/ui/shadcn/card";
import { Separator } from "@/shared/ui/shadcn/separator";

export const BusinessPricingQnaList = () => {
	const QIcon = (
		<span className="text-[20px] font-bold text-blue-40 md:text-[32px]">Q</span>
	);
	const data = [
		{
			title: "Can I upgrade/downgrade between tiers?",
			icon: QIcon,
			children: (
				<>
					<Separator />
					<CardDescription>
						Yes, you can upgrade from Enterprise to Premium at any time. Contact
						sales for details on SaaS tier adjustments.
					</CardDescription>
				</>
			),
		},
		{
			title: "Is there a volume discount for multiple clusters?",
			icon: QIcon,
			children: (
				<>
					<Separator />
					<CardDescription>
						Yes, we offer volume pricing for Enterprise and Premium customers
						deploying NetLOX across multiple clusters or environments. Contact
						our sales team for a custom quote.
					</CardDescription>
				</>
			),
		},
		{
			title: "Can I get a proof-of-concept (POC) before purchasing?",
			icon: QIcon,
			children: (
				<>
					<Separator />
					<CardDescription>
						Absolutely. We encourage professional teams to run a POC. Our
						engineering team can provide support during this evaluation period.
						Please request a demo to get started.
					</CardDescription>
				</>
			),
		},
	];
	return (
		<div className="space-y-14 lg:space-y-[100px]">
			<Reveal>
				<DataCard
					data={data}
					orientation="vertical"
					className="[&_.card-content]:!mt-0 [&_.card-content]:ml-4 [&_.card-content]:flex-1 md:[&_.card-content]:ml-6 lg:[&_.card-content]:ml-8 [&_.card-wrapper]:flex [&_.card-wrapper]:flex-wrap [&_.card-wrapper]:items-center [&_.icon-box]:size-10 [&_.icon-box]:rounded-lg md:[&_.icon-box]:size-15"
				/>
			</Reveal>
		</div>
	);
};
