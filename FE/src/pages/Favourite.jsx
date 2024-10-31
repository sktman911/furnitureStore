import React, { useEffect, useState } from "react";
import Products from "../components/Products";
import { productAPI } from "../modules/apiClient";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {motion} from "framer-motion";

export default function Favourite() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
  const [favourites, setFavourite] = useState([]);

  useEffect(() => {
    if (user === null) {
      navigate("/login", { replace: true });
      return;
    }

    const getFavourites = async () => {
      await productAPI()
        .GET_FAVOURITE(user?.cusId)
        .then((res) => setFavourite(res.data))
        .catch((err) => console.log(err));
    };
    getFavourites();
  }, []);

  return (
    <>
      <motion.div className="mt-24" initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration: 0.2}}>
        <h1 className="py-5 font-bold text-3xl">Favourite</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-11/12 max-h-full justify-around mx-auto"
        >
          {favourites.map((item, index) => {
            return (
              <Products
                key={index}
                id={item.productId}
                img={item.images[0].imageLink}
                name={item.productName}
                
                price={Intl.NumberFormat('vi-VI',{style:'currency',currency: 'VND',}).format(item.price)}
                sale={item.sale}
                salePrice={Intl.NumberFormat('vi-VI',{style:'currency',currency: 'VND',}).format( item.price - (item.price * item.sale) / 100)}
              />
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
