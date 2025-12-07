import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";
import { Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui";

interface Props {
	children: React.ReactNode;
	className?: string;
	eyebrow?: string;
	title?: ReactNode;
	description?: ReactNode;
}

export const RootSectionLayout = ({
	children,
	className,
	eyebrow,
	title,
	description,
}: Props) => {
	return (
		<section
			className={cn(
				"relative flex items-center justify-center py-15 md:py-25 lg:h-[100dvh] lg:py-0",
				className,
			)}
		>
			<div className="wrapper">
				<Reveal>
					<div className="mb-10 text-center lg:mb-20">
						<PageHead
							eyebrow={eyebrow}
							title={title}
							description={description}
							align="center"
						/>
					</div>
				</Reveal>
				{children}
			</div>
		</section>
	);
};
