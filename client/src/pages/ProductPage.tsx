import { FC, Key, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Tabs, Tab } from '@nextui-org/react'

import { Loader } from '../components/ui/Loader'
import { ProductDescription } from '../components/ProductDescription/ProductDescription'
import { ProductChar } from '../components/ProductChar/ProductChar'

import { getProductById } from '../db'

import { Product } from '../lib/models/product.interface'
import type { TabName } from '../lib/models/tabName.type'

export const ProductPage: FC = () => {
	const [product, setProduct] = useState<Product | Record<string, never>>({})
	const [activeTab, setActiveTab] = useState<TabName>('Описание')

	const { productId } = useParams()

	useEffect(() => {
		const fetchProductById = async () => {
			if (productId) {
				const product = await getProductById(productId)
				setProduct(product as Product)
			}
		}

		fetchProductById()
	}, [productId])

	const renderContent = (product: Product) => {
		switch (activeTab) {
			case 'Описание':
				return <ProductDescription product={product} />

			case 'Характеристика':
				return <ProductChar product={product} />

			default:
				throw new Error('Ошибка с табом')
		}
	}

	return (
		<div className='mx-auto max-w-[1000px] mt-10'>
			{Object.keys(product).length > 0 ? (
				<>
					<Tabs
						selectedKey={activeTab}
						onSelectionChange={setActiveTab as (key: Key) => string}
						className='mb-5'
						color='primary'
						aria-label='Tabs colors'
						radius='full'
					>
						<Tab key='Описание' title='Описание' />
						<Tab key='Характеристика' title='Характеристика' />
					</Tabs>
					{renderContent(product as Product)}
				</>
			) : (
				<Loader />
			)}
		</div>
	)
}
