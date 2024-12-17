import NavMenu from '@/components/NavMenu';
import {
	ColumnDef,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { Edit3, Trash2 } from 'lucide-react';

import Paginate from '@/components/Paginate';
import { TableData } from '@/components/TableData';
import { Input } from '@/components/ui/input';
import { getImageUrl } from '@/lib/utils';
import { useDeleteDoctor } from '@/services/mutations';
import { useDoctors } from '@/services/queries';
import { Doctor } from '@/types/doctor';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import DoctorFormDialog from '@/components/DoctorFormDialog';
import AddDoctorFormDialog from '@/components/AddDoctorFormDialog';

const columns: ColumnDef<Doctor>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
		cell: ({ row }) => <div className="capitalize">{row.original.id}</div>,
	},
	{
		accessorKey: 'image_file_key',
		header: 'Image',
		cell: ({ row }) => (
			<Avatar className="h-8 w-8 rounded-lg">
				<AvatarImage
					src={getImageUrl(row.original.image_file_key)}
					className="h-10 w-10 rounded-lg"
				/>
				<AvatarFallback className="h-8 w-8 rounded-lg ">DR.</AvatarFallback>
			</Avatar>
		),
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
	},
	{
		accessorKey: 'age',
		header: 'Age',
		cell: ({ row }) => <div className="capitalize">{row.original.age}</div>,
	},
	{
		accessorKey: 'specialty',
		header: 'Specialty',
		cell: ({ row }) => (
			<div className="capitalize">{row.original.specialty ?? '--'}</div>
		),
	},
	{
		accessorKey: 'contact',
		header: 'Contact',
		cell: ({ row }) => (
			<div className="lowercase">{row.original.contact ?? '--'}</div>
		),
	},
	{
		accessorKey: 'description',
		header: 'Description',
		cell: ({ row }) => (
			<div className="lowercase">{row.original.description ?? '--'}</div>
		),
	},
	{
		accessorKey: 'delete',
		header: 'Delete',
		cell: () => <Trash2 />,
	},
	{
		accessorKey: 'update',
		header: 'Edit',
		cell: () => <Edit3 />,
	},
];
export default function Doctors() {
	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(5);
	const [search, setSearch] = useState<string | null>();
	const [open, setOpen] = useState(false)
	const deleteDoctorMutation = useDeleteDoctor();

	const { data, isPending, isError } = useDoctors({
		page,
		limit,
		search,
	});

	const table = useReactTable({
		data: data?.data ?? [],
		columns: columns,
		getCoreRowModel: getCoreRowModel(),
	});

	if (isError) {
		return <div>Something went wrong while fetching data...</div>;
	}

	return (
		<>
			<NavMenu />
			<div className="w-full items-center">
				<div className="flex items-center justify-between">
					<div className="flex items-center justify-start py-4 m-12">
						<h1 className="text-2xl font-bold mb-2">Doctors</h1>
					</div>

					<div className="flex items-center justify-end py-4 m-12">
						<div>
						<Button variant='secondary' onClick={()=>{
							setOpen(true);
						}} >Create</Button>
					</div>
					</div>

				</div>
				<div className="rounded-md border">
					<TableData<Doctor>
						isPending={isPending}
						table={table}
						columns={columns}
						deleteMutation={deleteDoctorMutation}
					/>
				</div>
				<div className="flex items-center justify-end space-x-2 py-4">
					<Paginate page={page} setPage={setPage} />
				</div>
				{
				open ? <AddDoctorFormDialog open={open} setOpen={setOpen}/> : null
			}
				
			</div>
		</>
	);
}
