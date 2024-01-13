import React from "react";

const ColorPicker = () => {
  return (
    <div>
      <div className="py-3">
        <label className="text-gray-400" htmlFor="">
          Color
        </label>
        <div className="flex items-baseline mt-2">
          <div className="space-x-2 flex gap-2 text-sm">
            <label>
              <input className="sr-only peer" name="size" type="radio" value="1" />
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer bg-violet-500 text-slate-700
                 peer-checked:border-2 peer-checked:border-gray peer-checked:text-red"
              ></div>
            </label>
            <label>
              <input className="sr-only peer" name="size" type="radio" value="2" />
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer bg-black text-slate-700
                peer-checked:border-2 peer-checked:border-gray peer-checked:border-white peer-checked:text-white"
              ></div>
            </label>
            <label>
              <input className="sr-only peer" name="size" type="radio" value="3" />
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer bg-yellow-600 text-slate-700
                 peer-checked:border-2 peer-checked:border-gray peer-checked:border-white peer-checked:text-white"
              ></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
