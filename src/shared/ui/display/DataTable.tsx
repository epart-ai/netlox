"use client";

import { useState } from "react";

import {
	type ColumnDef,
	type ColumnFiltersState,
	type RowSelectionState,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { cn } from "@/shared/lib/utils";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../shadcn/table";

interface Props<TData, TValue> {
	data: ReadonlyArray<TData>;
	columns: ReadonlyArray<ColumnDef<TData, TValue>>;
	getRowId?: (row: TData, index: number) => string;
	emptyText?: string;
	className?: string;
	tableClassName?: string;
}

export function DataTable<TData = unknown, TValue = unknown>({
	data,
	columns,
	getRowId,
	emptyText = "No results.",
	className,
	tableClassName,
}: Props<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

	const table = useReactTable<TData>({
		data: data as TData[],
		columns: columns as ColumnDef<TData, unknown>[],
		getRowId,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div
			className={cn("glass-surface relative w-full overflow-x-auto", className)}
		>
			<Table className={tableClassName}>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								const meta = header.column.columnDef.meta as
									| { className?: string; width?: string }
									| undefined;
								return (
									<TableHead
										key={header.id}
										className={meta?.className}
										width={meta?.width}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.length > 0 ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => {
									const meta = cell.column.columnDef.meta as
										| { className?: string; width?: string }
										| undefined;
									return (
										<TableCell
											key={cell.id}
											className={meta?.className}
											width={meta?.width}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									);
								})}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell className="h-24 text-center">{emptyText}</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
