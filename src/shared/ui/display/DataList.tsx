import Image from "next/image";

import { cn } from "@/shared/lib/utils";

interface Props {
	variant?: "default" | "blue";
	data: string[];
	className?: string;
}

export const DataList = ({ data, className }: Props) => {
	return (
		<ul className={cn("flex flex-col gap-1.5 md:gap-2", className)}>
			{data.map((item, index) => (
				<li key={index} className="flex items-center gap-1.5">
					<div className="flex items-center justify-center rounded-full bg-blue-20 p-1">
						<Image
							src="/images/common/icon_check_white.svg"
							alt="Check Icon"
							width={8}
							height={8}
						/>
					</div>
					<p className="paragraph-12 opacity-50 md:paragraph-14">{item}</p>
				</li>
			))}
		</ul>
	);
};
