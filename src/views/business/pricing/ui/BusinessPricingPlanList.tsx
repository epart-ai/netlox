"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { ROUTES } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import { Reveal } from "@/shared/ui/display";
import { Button } from "@/shared/ui/shadcn/button";
import {
	Card,
	CardHeader,
	CardList,
	CardTitle,
	CardWrapper,
} from "@/shared/ui/shadcn/card";

export const BusinessPricingPlanList = () => {
	const planList: {
		themeColor: string;
		eyebrow: string;
		price: ReactNode;
		description: string;
		button: ReactNode;
		highlight?: boolean;
	}[] = [
		{
			themeColor: "green",
			eyebrow: "Open Source",
			price: "FREE",
			description: "For developers & community",
			button: (
				<Button variant="secondary" asChild>
					<Link href="https://github.com/loxilb-io/loxilb" target="_blank">
						Get started
					</Link>
				</Button>
			),
		},
		{
			highlight: true,
			themeColor: "blue",
			eyebrow: "Enterprise",
			price: (
				<>
					$2,999<span className="paragraph-20 font-medium">/month</span>
				</>
			),
			description: "Fixed price with full support",
			button: (
				<Button variant="primary" asChild>
					<Link
						href={{
							pathname: ROUTES.BUSINESS_CONTACT,
							query: { help_options: "technical" },
						}}
					>
						Request Quote
					</Link>
				</Button>
			),
		},
		{
			themeColor: "purple",
			eyebrow: "Premium",
			price: "Custom",
			description: "For 24/7 mission-critical needs",
			button: (
				<Button variant="secondary" asChild>
					<Link
						href={{
							pathname: ROUTES.BUSINESS_CONTACT,
							query: { help_options: "technical" },
						}}
					>
						Contact Sales
					</Link>
				</Button>
			),
		},
		{
			themeColor: "orange",
			eyebrow: "SaaS",
			price: (
				<>
					$2,999<span className="paragraph-20 font-medium">/month</span>
				</>
			),
			description: "Pay-as-you-go on AWS",
			button: (
				<Button
					variant="secondary"
					onClick={() =>
						alert(
							"The AWS Marketplace service is currently under preparation. It is scheduled for official launch in the first quarter of 2026. We will be launching soon!",
						)
					}
				>
					Launch on AWS
				</Button>
			),
		},
	];
	return (
		<Reveal>
			<CardList className="gap-x-2.5 gap-y-6 lg:grid-cols-4 lg:gap-5">
				{planList.map((plan) => (
					<Card
						key={plan.eyebrow}
						className={cn("overflow-visible p-6", plan.highlight && `border-2`)}
						{...(plan.highlight && {
							style: {
								borderColor: `var(--color-${plan.themeColor}-40)`,
							},
						})}
					>
						{plan.highlight && (
							<span
								className={cn(
									"title-14 absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md px-4.5 py-1.5",
									`bg-${plan.themeColor}-40`,
								)}
							>
								Most Popular
							</span>
						)}
						<CardWrapper className="text-center">
							<CardHeader>
								<CardTitle className="!text-[32px]">
									<div
										className={`mb-2.5 text-[14px] text-${plan.themeColor}-20`}
									>
										{plan.eyebrow}
									</div>
									{plan.price}
								</CardTitle>
								<p className="paragraph-16 mt-3">{plan.description}</p>
							</CardHeader>
							{plan.button}
						</CardWrapper>
					</Card>
				))}
			</CardList>
		</Reveal>
	);
};
