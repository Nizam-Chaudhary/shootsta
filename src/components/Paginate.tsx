import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from './ui/pagination';
type Props = {
	page: number;
	setPage: any;
};

export default function Paginate({ page, setPage }: Props) {
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						className="cursor-pointer"
						onClick={(event) => {
							event.preventDefault();
							setPage((current: number) => {
								return current <= 1 ? 1 : current - 1;
							});
						}}
					/>
				</PaginationItem>
				{page > 1 ? (
					<PaginationItem
						className="cursor-pointer"
						onClick={(event) => {
							event.preventDefault();
							setPage((current: number) => current - 1);
						}}
					>
						<PaginationLink>{page - 1}</PaginationLink>
					</PaginationItem>
				) : null}
				<PaginationItem
					className="cursor-pointer"
					onClick={(event) => {
						event.preventDefault();
					}}
				>
					<PaginationLink isActive>{page}</PaginationLink>
				</PaginationItem>
				<PaginationItem
					className="cursor-pointer"
					onClick={(event) => {
						event.preventDefault();
						setPage((current: number) => current + 1);
					}}
				>
					<PaginationLink>{page + 1}</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationNext
						className="cursor-pointer"
						onClick={(event) => {
							event.preventDefault();
							setPage((current: number) => current + 1);
						}}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
