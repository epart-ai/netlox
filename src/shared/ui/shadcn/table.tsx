/* eslint-disable jsx-a11y/prefer-tag-over-role, jsx-a11y/interactive-supports-focus */
import * as React from "react";

import { cn } from "../../lib/utils";

const Table = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	/* biome-ignore lint/a11y/useSemanticElements: div에 ARIA table role을 써서 CSS 테이블 레이아웃/호버를 제어하기 위함 */
	<div
		ref={ref}
		role="table"
		className={cn(
			"group/table w-full caption-bottom data-[orientation=vertical]:flex data-[orientation=horizontal]:table",
			className,
		)}
		{...props}
	/>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	/* biome-ignore lint/a11y/useSemanticElements: div에 rowgroup 역할을 부여하여 thead/tbody 유사 구조를 표현 */
	<div
		ref={ref}
		role="rowgroup"
		className={cn(
			"title-14 lg:title-16 group-data-[orientation=horizontal]/table:table-header-group",
			className,
		)}
		{...props}
	/>
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	/* biome-ignore lint/a11y/useSemanticElements: div에 rowgroup 역할을 부여하여 tbody 역할을 대체 */
	<div
		ref={ref}
		role="rowgroup"
		className={cn(
			"table-body paragraph-14 lg:paragraph-16 group-data-[orientation=vertical]/table:flex group-data-[orientation=horizontal]/table:table-row-group",
			className,
		)}
		{...props}
	/>
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	/* biome-ignore lint/a11y/useSemanticElements: div에 rowgroup 역할을 부여하여 tfoot 역할을 대체 */
	<div
		ref={ref}
		role="rowgroup"
		className={cn(
			"group-data-[orientation=horizontal]/table:table-footer-group",
			className,
		)}
		{...props}
	/>
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	/* biome-ignore lint/a11y/useSemanticElements: div에 row 역할을 부여하여 tr 역할을 대체 */
	<div
		ref={ref}
		role="row"
		tabIndex={-1}
		className={cn(
			"data-[state=selected]:bg-muted relative border-b border-white/10 after:absolute after:bottom-1 after:left-0 after:right-0 after:top-1 after:rounded-lg after:bg-blue-40/15 after:opacity-0 after:transition-opacity after:duration-300 after:ease-out group-data-[orientation=horizontal]/table:table-row [.table-body_&:hover]:after:opacity-100",
			"group-data-[orientation=horizontal]/table:before:absolute group-data-[orientation=horizontal]/table:before:bottom-0 group-data-[orientation=horizontal]/table:before:left-0 group-data-[orientation=horizontal]/table:before:right-0 group-data-[orientation=horizontal]/table:before:h-px group-data-[orientation=horizontal]/table:before:bg-white/10 group-data-[orientation=horizontal]/table:before:content-['']",
			className,
		)}
		{...props}
	/>
));
TableRow.displayName = "TableRow";

type HeaderDivProps = React.HTMLAttributes<HTMLDivElement> & {
	scope?: "col" | "row";
	width?: string;
};

const TableHead = React.forwardRef<HTMLDivElement, HeaderDivProps>(
	({ className, scope: _scope = "col", style, width, ...props }, ref) => {
		void _scope;
		return (
			<div
				ref={ref}
				role={_scope === "row" ? "rowheader" : "columnheader"}
				className={cn(
					"px-1.5 py-2.5 text-left font-medium group-data-[orientation=horizontal]/table:table-cell lg:px-3 lg:py-4.5",
					// vertical 모드에서는 첫 번째를 제외한 헤더에 before로 상단 라인 추가
					"relative group-data-[orientation=vertical]/table:[&:nth-child(n+3)]:before:absolute group-data-[orientation=vertical]/table:[&:nth-child(n+3)]:before:left-0 group-data-[orientation=vertical]/table:[&:nth-child(n+3)]:before:right-0 group-data-[orientation=vertical]/table:[&:nth-child(n+3)]:before:top-0 group-data-[orientation=vertical]/table:[&:nth-child(n+3)]:before:h-px group-data-[orientation=vertical]/table:[&:nth-child(n+3)]:before:bg-white/10 group-data-[orientation=vertical]/table:[&:nth-child(n+3)]:before:content-['']",

					className,
				)}
				style={width ? { ...style, width } : style}
				{...props}
			/>
		);
	},
);
TableHead.displayName = "TableHead";

type CellDivProps = React.HTMLAttributes<HTMLDivElement> & {
	width?: string;
};

const TableCell = React.forwardRef<HTMLDivElement, CellDivProps>(
	({ className, style, width, ...props }, ref) => (
		/* biome-ignore lint/a11y/useSemanticElements: div에 cell 역할을 부여하여 td 역할을 대체 */
		<div
			ref={ref}
			role="cell"
			className={cn(
				"group-data-[orientation=vertical]/table: whitespace-nowrap px-1.5 py-2.5 font-medium group-data-[orientation=horizontal]/table:table-cell lg:px-3 lg:py-4.5",
				// vertical 모드에서는 첫 번째를 제외한 셀에 before로 상단 라인 추가
				"relative group-data-[orientation=vertical]/table:[&:nth-child(n+3)]:before:absolute group-data-[orientation=vertical]/table:[&:nth-child(n+3)]:before:left-0 group-data-[orientation=vertical]/table:[&:nth-child(n+3)]:before:right-0 group-data-[orientation=vertical]/table:[&:nth-child(n+3)]:before:top-0 group-data-[orientation=vertical]/table:[&:nth-child(n+3)]:before:h-px group-data-[orientation=vertical]/table:[&:nth-child(n+3)]:before:w-[400%] group-data-[orientation=vertical]/table:[&:nth-child(n+3)]:before:bg-white/10 group-data-[orientation=vertical]/table:[&:nth-child(n+3)]:before:content-['']",
				className,
			)}
			style={width ? { ...style, width } : style}
			{...props}
		/>
	),
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("mt-4 text-sm", className)} {...props} />
));
TableCaption.displayName = "TableCaption";

export {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
};
