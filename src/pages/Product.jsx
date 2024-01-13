import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router';
import Breadcrum from '../components/Breadcrum';
import ProductDisplay from '../components/ProductDisplay';

const Product = () => {
    const {products} = useContext(ShopContext);
    const {productId} = useParams();
    const product = products.find(e => e.productId === Number(productId));
  return (
    <>
    {products.length > 0 ? (
      <div className='mt-24'>
        <Breadcrum product={product} />
        <ProductDisplay product={product} />
      </div>
    ) : (
      <></>
    )}
    </>
  )
}

export default Product
