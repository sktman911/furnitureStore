import React, { useEffect, useState } from "react";
import Products from "../components/Products";
import numeral from "numeral";
import { productAPI } from "../modules/apiClient";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

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
      <div className="mt-24">
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
                price={numeral(item.price).format("0,0")}
                sale={item.sale}
                salePrice={numeral(
                  item.price - (item.price * item.sale) / 100
                ).format("0,0")}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
