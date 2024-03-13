import React, { useEffect, useState } from "react";
import { colorAPI } from "../modules/apiClient";
import { useParams } from "react-router";

const ColorPicker = () => {
  const {productId} = useParams();
  const [color, setColor] = useState([]);

  useEffect(() => {
    colorAPI()
      .GET(productId)
      .then((res) => setColor(res.data))
      .catch((err) => console.log(err));
  });

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
                    name="size"
                    type="radio"
                    value={item.colorId}
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
