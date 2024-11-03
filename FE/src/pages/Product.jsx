import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router';
import Breadcrum from '../components/Breadcrum';
import ProductDisplay from '../components/ProductDetail/ProductDisplay';
import {motion} from "framer-motion";

const Product = () => {
    const {products} = useContext(ShopContext);
    const {productId} = useParams();
    const product = products.find(e => e.productId === Number(productId));
  return (
    <>
    {products.length > 0 ? (
      <motion.div className='mt-24' initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration: 0.1}}>
        <Breadcrum product={product} />
        <ProductDisplay product={product} />
      </motion.div>
    ) : (
      <></>
    )}
    </>
  )
}

export default Product
