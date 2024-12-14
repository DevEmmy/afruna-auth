import { GetProductsSubcategories } from '@/lib/dataFetchingFns';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

type Props = {
	category: string;
};

const SubCategories = (props: Props) => {
	const { category } = props;

	const allSubCategories = useQuery({
		queryKey: ['subcategories-by-category', category],
		queryFn: () => GetProductsSubcategories(category),
	});
	return (
		<div className=''>
			<h1>hello</h1>
		</div>
	);
};

export default SubCategories;
