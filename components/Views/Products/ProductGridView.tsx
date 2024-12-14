import React from 'react';
import { ProductsCard } from '@/components/widgets/ProductsCard';
import { productDetailsProps } from '@/lib/types';

type Props = {
	products: productDetailsProps[];
};

const ProductGridView = (props: Props) => {
	const { products } = props;
	return (
		<>
			{/* <div className="grid grid-cols-5 items-center gap-5 mb-8"> */}
			<div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 flex-wrap">
				{products?.map((product: productDetailsProps, idx) => (
					<div className="mb-5" key={idx}>
						<ProductsCard noborder key={idx} item={product} />
					</div>
				))}
			</div>
		</>
	);
};

export default ProductGridView;
