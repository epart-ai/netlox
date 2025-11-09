import * as React from "react";

import { cn } from "@/shared/lib/utils";

const Table = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div className={cn("", className)}>
		<div
			ref={ref}
			role="table"
			className={cn("w-full caption-bottom px-4 lg:px-5", className)}
			{...props}
		/>
	</div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		role="rowgroup"
		className={cn("title-14 lg:title-16", className)}
		{...props}
	/>
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		role="rowgroup"
		className={cn("table-body paragraph-14 lg:paragraph-16", className)}
		{...props}
	/>
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} role="rowgroup" className={cn("", className)} {...props} />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		role="row"
		className={cn(
			"data-[state=selected]:bg-muted relative flex border-b border-white/10 after:absolute after:bottom-1 after:left-0 after:right-0 after:top-1 after:rounded-lg after:bg-blue-600/25 after:opacity-0 after:transition-opacity after:duration-300 after:ease-out [.table-body_&:hover]:after:opacity-100",
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
	({ className, scope = "col", ...props }, ref) => (
		<div
			ref={ref}
			role={scope === "row" ? "rowheader" : "columnheader"}
			className={cn(
				"px-1.5 py-3 text-left font-medium lg:px-3 lg:py-4.5 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",

				className,
			)}
			{...props}
		/>
	),
);
TableHead.displayName = "TableHead";

type CellDivProps = React.HTMLAttributes<HTMLDivElement> & { width?: string };

const TableCell = React.forwardRef<HTMLDivElement, CellDivProps>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			role="cell"
			className={cn(
				"whitespace-nowrap px-1.5 py-2 font-medium lg:px-3 lg:py-3.5 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	),
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		role="caption"
		className={cn("text-muted-foreground mt-4 text-sm", className)}
		{...props}
	/>
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
