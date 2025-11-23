import * as React from "react";

import { cn } from "../../lib/utils";

const Table = React.forwardRef<
	HTMLTableElement,
	React.TableHTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
	<table
		ref={ref}
		className={cn("w-full caption-bottom px-4 lg:px-5", className)}
		{...props}
	/>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<thead
		ref={ref}
		className={cn("title-14 lg:title-16", className)}
		{...props}
	/>
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<tbody
		ref={ref}
		className={cn("table-body paragraph-14 lg:paragraph-16", className)}
		{...props}
	/>
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<tfoot ref={ref} className={cn("", className)} {...props} />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
	HTMLTableRowElement,
	React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
	<tr
		ref={ref}
		className={cn(
			"data-[state=selected]:bg-muted relative border-b border-white/10 after:absolute after:bottom-1 after:left-0 after:right-0 after:top-1 after:rounded-lg after:bg-blue-100/25 after:opacity-0 after:transition-opacity after:duration-300 after:ease-out [.table-body_&:hover]:after:opacity-100",
			className,
		)}
		{...props}
	/>
));
TableRow.displayName = "TableRow";

type HeaderDivProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
	scope?: "col" | "row";
	width?: string;
};

const TableHead = React.forwardRef<HTMLTableCellElement, HeaderDivProps>(
	({ className, scope = "col", ...props }, ref) => (
		<th
			ref={ref}
			scope={scope}
			className={cn(
				"px-1.5 py-2 text-left font-medium lg:px-3 lg:py-3.5",

				className,
			)}
			{...props}
		/>
	),
);
TableHead.displayName = "TableHead";

type CellDivProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
	width?: string;
};

const TableCell = React.forwardRef<HTMLTableCellElement, CellDivProps>(
	({ className, ...props }, ref) => (
		<td
			ref={ref}
			className={cn(
				"whitespace-nowrap px-1.5 py-2 font-medium lg:px-3 lg:py-3.5",
				className,
			)}
			{...props}
		/>
	),
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
	HTMLTableCaptionElement,
	React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
	<caption
		ref={ref}
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
