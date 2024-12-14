import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Pagination,
	SortDescriptor,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react';
import { Loader2 } from 'lucide-react';
import { useMemo, useState } from 'react';

type TableProps = {
	columns: any;
	filteredItems: any[];
	renderCell: any;
	isLoading?: boolean;
	emptyContent: string;
	topContent?: any;
	colored_rows?: number[];
	page: number;
	setPage: any;
	pages: number;
};

const TableComponent = ({
	columns,
	filteredItems,
	renderCell,
	isLoading,
	emptyContent,
	topContent,
	colored_rows,
	page,
	setPage,
	pages,
}: TableProps) => {
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: 'name',
		direction: 'ascending',
	});

	const sortedItems = useMemo(() => {
		return [...filteredItems].sort((a: any, b: any) => {
			const first = a[sortDescriptor.column as keyof any] as number;
			const second = b[sortDescriptor.column as keyof any] as number;
			const cmp = first < second ? -1 : first > second ? 1 : 0;

			return sortDescriptor.direction === 'descending' ? -cmp : cmp;
		});
	}, [sortDescriptor, filteredItems]);

	const bottomContent = useMemo(() => {
		return (
			<div className="flex items-center justify-end gap-1">
				<Pagination
					showControls
					color="primary"
					variant="bordered"
					page={page}
					total={pages}
					radius="full"
					classNames={{
						prev: 'rounded-none text-gray',
						next: ' rounded-none',
					}}
					onChange={setPage}
				/>
			</div>
		);
	}, [page, pages, setPage]);

	return (
		<Table
			aria-label="Table"
			isHeaderSticky
			bottomContent={filteredItems?.length > 0 ? bottomContent : null}
			bottomContentPlacement="outside"
			selectedKeys={colored_rows}
			color={'primary'}
			classNames={{
				wrapper: 'max-h-[700px] m-1 w-fit md:w-full p-0 rounded-md shadow-none',
				thead: 'rounded border-none',
				th: 'first:rounded-l-none last:rounded-r-none bg-[#F8FAFC] h-12 px-6 text-[#64748B] text-sm shadow-none',
				tr: 'h-[52px] [&:not(:last-child)]:border-b [&:not(:last-child)]:border-gray-100',
				td: 'text-[#64748B] text-sm capitalize px-6 py-0',
			}}
			topContent={topContent}
			topContentPlacement="outside"
			sortDescriptor={sortDescriptor}
			onSortChange={setSortDescriptor}
		>
			<TableHeader columns={columns}>
				{(column: any) => (
					<TableColumn
						key={column.uid}
						align={column.uid === 'actions' ? 'center' : 'start'}
						allowsSorting={column.sortable}
						maxWidth={30}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody
				emptyContent={emptyContent}
				items={sortedItems}
				isLoading={isLoading}
				loadingContent={<Loader2 className="h-6 w-6 animate-spin" />}
			>
				{(item) => (
					<TableRow
						key={item?._id}
						className={`${colored_rows?.includes(item.id) ? 'bg-[#FFEDEA]' : ''}`}
					>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

export default TableComponent;
