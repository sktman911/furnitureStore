import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";

const ColorPicker = (props) => {
  const { colors } = useContext(ShopContext);
  const pscList = props.product.productSizeColors;
  const [amount, setAmount] = useState();

  const color = colors.filter((item) =>
    pscList.some((psc) => psc.colorId === item.colorId)
  );

  const selectedColor = (data) => {
    props.onChange(data);
    const newAmount = pscList
      .filter((item) =>
        props.size === null
          ? item.colorId === data[0]
          : item.colorId === data[0] & item.sizeId === props.size[0]
      )
      .map((item) => item.quantity)
      .reduce((total, quantity) => total + quantity, 0);
    setAmount(newAmount);
  };

  return (
    <div>
      <div className="py-3">
        <label className="text-gray-400" htmlFor="">
          Color
        </label>
        <div className="flex items-baseline mt-2">
          <div className="space-x-2 flex gap-2 text-sm">
            {color &&
              color.map((item) => (
                <label key={item.colorId}>
                  <input
                    className="sr-only peer"
                    name="color"
                    type="radio"
                    onChange={() =>
                      selectedColor([item.colorId, item.colorHexcode])
                    }
                  />
                  <div
                    style={{ backgroundColor: item.colorHexcode }}
                    className="w-7 h-7 rounded-full flex items-center justify-center border-2 border-gray cursor-pointer
                  peer-checked:border-slate-700"
                  ></div>
                </label>
              ))}
          </div>
          <div className="ml-6">
            {(props.size !== null && props.color !== null) && (
              <p>Stocks: {amount}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
