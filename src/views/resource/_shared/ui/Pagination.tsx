import Image from "next/image";
import Link from "next/link";

import { cva } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";
import { responsiveArrow, responsiveArrowBack } from "@/shared/styles/snippets";

type PaginationProps = {
	currentPage: number;
	totalPages: number;
};

const paginationButtonVariants = cva(
	"paragraph-14 md:paragraph-16 lg:paragraph-20 font-bold size-8 md:size-10 lg:size-12 rounded-lg flex items-center justify-center",
	{
		variants: {
			active: {
				true: "bg-blue-60 text-white",
				false: "",
			},
			visible: {
				true: "",
				false: "opacity-0",
			},
		},
	},
);

export function Pagination({ currentPage, totalPages }: PaginationProps) {
	if (totalPages <= 1) return null;

	const pagesPerBlock = 5;
	const start =
		Math.floor((currentPage - 1) / pagesPerBlock) * pagesPerBlock + 1;
	const end = Math.min(start + pagesPerBlock - 1, totalPages);

	return (
		<div className="mt-10 flex items-center justify-center gap-1 lg:mt-20">
			<Link
				href={{ query: { page: currentPage - 1 } }}
				className={cn(paginationButtonVariants({ visible: currentPage > 1 }))}
			>
				<Image
					src="/images/common/icon_arrow_white.svg"
					className={responsiveArrowBack}
					alt="Previous"
					width={10}
					height={16}
				/>
			</Link>

			{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
				if (page >= start && page <= end) {
					return (
						<Link
							key={page}
							href={{ query: { page: page } }}
							className={cn(
								paginationButtonVariants({ active: currentPage === page }),
							)}
						>
							{page}
						</Link>
					);
				}
				return null;
			})}

			<Link
				href={{ query: { page: currentPage + 1 } }}
				className={cn(
					paginationButtonVariants({ visible: currentPage < totalPages }),
				)}
			>
				<Image
					src="/images/common/icon_arrow_white.svg"
					className={responsiveArrow}
					alt="Previous"
					width={10}
					height={16}
				/>
			</Link>
		</div>
	);
}
