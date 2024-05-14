import React, { useEffect, useState } from "react";
import { sizeAPI } from "../modules/apiClient";
import { useParams } from "react-router";

const SizePicker = (props) => {
  const { productId } = useParams();
  const [size, setSize] = useState([]);

  useEffect(() => {
    sizeAPI()
      .GET_ID(productId)
      .then((res) => setSize(res.data))
      .catch((err) => console.log(err));
  }, []);

  const selectedSize = (data) => {
    props.onChange(data);
  };

  return (
    <div>
      <div className="py-3">
        <label className="text-gray-400" htmlFor="">
          Size
        </label>
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
        </div>
      </div>
    </div>
  );
};

export default SizePicker;
