import { Pagination } from '@nextui-org/react';
import React from 'react';

type Props = {
	page: number;
	setPage: any;
	pages: number;
};

const PaginationItem = ({ page, setPage, pages }: Props) => {
	return (
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
	);
};
export default PaginationItem;
