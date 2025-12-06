"use client";

import { useEffect, useState } from "react";

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
	selectedRowIndex?: number;
	orientation?: "horizontal" | "vertical";
	enableHover?: boolean;
}

export function DataTable<TData = unknown, TValue = unknown>({
	data,
	columns,
	getRowId,
	emptyText = "No results.",
	className,
	tableClassName,
	selectedRowIndex,
	orientation = "horizontal",
	enableHover = true,
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

	const selectedRowId =
		selectedRowIndex == null
			? undefined
			: table.getRowModel().rows[selectedRowIndex]?.id;

	useEffect(() => {
		if (selectedRowId == null) {
			setRowSelection({});
			return;
		}

		setRowSelection((previous) =>
			previous[selectedRowId] ? previous : { [selectedRowId]: true },
		);
	}, [selectedRowId]);

	const rowLength = table.getRowModel().rows.length;

	return (
		<div
			className={cn(
				"glass-surface relative w-full overflow-x-auto px-4 lg:px-5",
				className,
			)}
		>
			<Table
				className={cn("table w-full caption-bottom", tableClassName)}
				data-orientation={orientation}
			>
				<TableHeader className={cn(orientation === "vertical" && "flex-1")}>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								const meta = header.column.columnDef.meta as
									| { className?: string; width?: string }
									| undefined;
								return (
									<TableHead
										key={header.id}
										className={cn(meta?.className)}
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
				<TableBody
					style={{ flex: orientation === "vertical" ? rowLength : undefined }}
				>
					{rowLength > 0 ? (
						table.getRowModel().rows.map((row) => {
							const renderRows = () => {
								return (
									<TableRow
										key={row.id}
										className={cn(orientation === "vertical" ? "w-max" : "")}
										data-state={row.getIsSelected() && "selected"}
										enableHover={enableHover}
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
								);
							};

							return orientation === "horizontal" ? (
								renderRows()
							) : (
								<div
									key={row.id}
									className="t-table-row-box flex-1 overflow-hidden"
								>
									{renderRows()}
								</div>
							);
						})
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
