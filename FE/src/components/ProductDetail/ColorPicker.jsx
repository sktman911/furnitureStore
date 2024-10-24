import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

const ColorPicker = (props) => {
  const {colors} = useContext(ShopContext);

  const color = colors.filter((item) =>
    props.product.productSizeColors.some(
      (psc) => psc.colorId === item.colorId
    )
  );

  const selectedColor = (data) => {
    props.onChange(data);
  }

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
                    onChange={() => selectedColor([item.colorId, item.colorHexcode])}
                  />
                  <div
                    style={{backgroundColor: item.colorHexcode}}
                    className="w-7 h-7 rounded-full flex items-center justify-center border-2 border-gray cursor-pointer
                  peer-checked:border-slate-700"
                  ></div>
                </label>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
