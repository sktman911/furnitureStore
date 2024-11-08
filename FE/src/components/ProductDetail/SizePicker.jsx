import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";

const SizePicker = (props) => {
  const {sizes} = useContext(ShopContext);
  const pscList = props.product.productSizeColors;
  const [amount, setAmount] = useState();

  const size = sizes.filter((item) =>
    pscList.some(
      (psc) => psc.sizeId === item.sizeId
    )
  );

  const selectedSize = (data) => {
    props.onChange(data);
    const newAmount = pscList
    .filter((item) =>
      props.color === null
        ? item.sizeId === data[0]
        : item.sizeId === data[0] && item.colorId === props.color[0]
    )
    .map((item) => item.quantity)
    .reduce((total, quantity) => total + quantity, 0);
  setAmount(newAmount);
  };

  return (
    <div>
      <div className="py-3">
        <label className="text-gray-400" htmlFor="">
          Size:
        </label>
        <span></span>
        <div className="flex items-baseline mt-2">
          <div className="space-x-2 flex text-sm">
            {size &&
              size.map((item) => (
                <label key={item.sizeId}>
                  <input
                    className="sr-only peer"
                    name="size"
                    type="radio"
                    onChange={() =>
                      selectedSize([item.sizeId, item.sizeName])
                    }
                  />
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer bg-yellow-50 text-slate-700 peer-checked:bg-yellow-600 peer-checked:text-white">
                    {item.sizeName}
                  </div>
                </label>
              ))}
          </div>
          <div className="ml-6">
            {(props.color === null && props.size !== null) && (
              <p>Stocks: {amount}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizePicker;
