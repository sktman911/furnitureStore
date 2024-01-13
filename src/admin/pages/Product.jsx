import React,{useContext} from 'react'
import { useParams } from 'react-router';

import { ShopContext } from '../../context/ShopContext'

const Product = () => {

    const {products} = useContext(ShopContext);
    const {productId} = useParams();
    const product = products.find(e => e.productId === Number(productId));

  return (
    <div className='pt-12'>
      <div>
        <h1>{product.productName}</h1>
      </div>
    </div>
  )
}

export default Product
