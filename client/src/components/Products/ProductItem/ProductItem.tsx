import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardFooter, Image } from '@nextui-org/react'

import { HeartIcon } from '../../ui/HeartIcon'

import { Product } from '../../../lib/models/product.interface'
import { isProductInCart, cartActions } from '../../../store/slices/cartSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'

interface ProductItemProps {
	product: Product
}

export const ProductItem: FC<ProductItemProps> = ({ product }) => {
	const isProductLiked = useAppSelector(isProductInCart(product.id))
	const dispatch = useAppDispatch()

	const handleToggleProduct = () => {
		isProductLiked
			? dispatch(cartActions.toggleProduct(product.id))
			: dispatch(cartActions.toggleProduct(product))
	}

	return (
		<Card
			data-testid='product-card'
			as='li'
			shadow='sm'
			onPress={() => console.log('item pressed')}
		>
			<CardBody className='overflow-visible p-0'>
				<Image
					loading='lazy'
					shadow='sm'
					radius='lg'
					width='100%'
					alt={product.name}
					className='w-full object-cover h-[170px]'
					src={product.image}
				/>
			</CardBody>
			<CardFooter className='text-small justify-between'>
				<b>{product.name}</b>
				<p data-testid='product-price' className='text-default-500'>
					${product.price}
				</p>
			</CardFooter>
			<CardFooter className='justify-between items-center'>
				<Button
					isIconOnly
					className='text-default-900/60 data-[hover]:bg-foreground/10'
					radius='full'
					variant='light'
					onPress={handleToggleProduct}
				>
					<HeartIcon
						size={30}
						className={isProductLiked ? '[&>path]:stroke-transparent' : ''}
						fill={isProductLiked ? '#2563eb' : 'none'}
					/>
				</Button>
				<Button radius='sm' color='primary'>
					<Link to={`/catalog/${product.id}`}>Details</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}
