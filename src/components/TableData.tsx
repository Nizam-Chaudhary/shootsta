import { UseMutationResult } from '@tanstack/react-query';
import { flexRender, Table as TableType } from '@tanstack/react-table';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table';
import DoctorFormDialog from './DoctorFormDialog';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
type Props<T> = {
	table: TableType<T>;
	isPending: boolean;
	columns: any;
	deleteMutation: UseMutationResult<T, Error, number, unknown>;
};

export function TableData<T>({
	table,
	isPending,
	columns,
	deleteMutation,
}: Props<T>) {
	const [open, setOpen] = useState(false)
	const [id, setId] = useState<number>(0)

	return (
		<>
		<Table>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							return (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</TableHead>
							);
						})}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{isPending ? (
					<TableRow>
						<TableCell colSpan={columns.length} className="h-24 text-center">
							<div className="flex justify-center items-center space-x-2">
								<div
									className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-500"
									aria-label="Loading spinner"
								></div>
								<span>Loading...</span>
							</div>
						</TableCell>
					</TableRow>
				) : table.getRowModel().rows?.length ? (
					table.getRowModel().rows.map((row) => (
						<TableRow
							key={row.id}
							data-state={row.getIsSelected() && 'selected'}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell
									key={cell.id}
									onClick={() => {
										console.log('row', row.original);
										console.log('cell', cell);
										if (cell.id === `${row.id}_delete`) {
											// @ts-ignore
											deleteMutation.mutate(row.original.id);
											toast({
												title: "Removed successfully",
												variant: "default"
											})
										}
										if (cell.id === `${row.id}_update`) {
											// @ts-ignore
											setId(row.original.id)
											setOpen(true)
										}
									}}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell colSpan={columns.length} className="h-24 text-center">
							No results.
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
		{
			open ? <DoctorFormDialog open={open} setOpen={setOpen} id={id}/> : null
		}
		
		</>
	);
}
