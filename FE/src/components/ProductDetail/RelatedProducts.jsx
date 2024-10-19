import React, { useContext } from "react";
import Products from "../Products";
import { ShopContext } from "../../context/ShopContext";

export default function RelatedProducts(product) {
  const { products } = useContext(ShopContext);
  return (
    <div>
      <h1 className="text-3xl font-semibold">Related Products</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-11/12 justify-around mx-auto my-5">
        {products
          .filter(
            (item) =>
              item.subCategoryId === product.subCategoryId &&
              item.productId !== product.productId
          )
          .slice(0, 4)
          .map((item, index) => {
            return (
              <Products
                key={index}
                id={item.productId}
                img={item.images[0].imageLink}
                name={item.productName}
                price={item.price}
              />
            );
          })}
      </div>
    </div>
  );
}
