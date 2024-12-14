import Image from 'next/image';
import React from 'react';
interface ProductImageProps {
	src: string;
	alt?: string;
	placeholderSrc: string;
	containerClassName?: string;
	imageClassName?: string;
	className?: string;
}

const ProductImage: React.FC<ProductImageProps> = ({
	src,
	alt = 'product_image',
	placeholderSrc,
	containerClassName = '',
	imageClassName = 'p-2',
	className,
}) => {
	const imageSrc = src && src.length > 0 ? src : placeholderSrc;

	return (
		<div className={`flex justify-center items-center ${containerClassName}`}>
			<div className={`relative bg-gray-100 w-full h-36 ${className}`}>
				<Image src={src} alt={alt} layout="fill" objectFit="contain" className={imageClassName} />
			</div>
		</div>
	);
};

export default ProductImage;
