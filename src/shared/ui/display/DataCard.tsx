import Image from "next/image";
import Link from "next/link";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardList,
	CardTitle,
} from "@/shared/ui/shadcn/card";

type Card = {
	title: string;
	description: string;
	image?: string;
	link?: {
		label: string;
		url: string;
	};
	footer?: React.ReactNode;
};

interface Link {
	label: string;
	url: string;
}

interface Props {
	data: Card[];
	className?: string;
}

export const DataCard = ({ data, className }: Props) => {
	return (
		<CardList className={className}>
			{data.map((item) => (
				<Card key={item.title}>
					<CardContent>
						{item.image && (
							<div className="flex h-15 w-15 items-center justify-center rounded-2xl bg-blue-20/25 backdrop-blur-md lg:h-20 lg:w-20">
								<Image
									src={item.image}
									alt={item.title}
									width={44}
									height={44}
								/>
							</div>
						)}
						<div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
							<CardTitle>{item.title}</CardTitle>
							<CardDescription>{item.description}</CardDescription>
						</div>
						{item.link && (
							<Link
								href={item.link.url}
								className="subTitle-14 inline-flex w-fit items-center gap-2 md:gap-3"
							>
								{item.link.label}
								<Image
									src="/images/common/icon_arrow_blue.svg"
									alt="arrow-right"
									width={5}
									height={8}
								/>
							</Link>
						)}
					</CardContent>
					{item.footer && <CardFooter>{item.footer}</CardFooter>}
				</Card>
			))}
		</CardList>
	);
};
