import React from "react";

const SizePicker = () => {
  return (
    <div>
      <div className="py-3">
        <label className="text-gray-400" htmlFor="">
          Size
        </label>
        <div className="flex items-baseline mt-2">
          <div className="space-x-2 flex text-sm">
            <label>
              <input className="sr-only peer" name="size" type="radio" value="s" />
              <div className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer bg-yellow-50 text-slate-700 peer-checked:bg-yellow-600 peer-checked:text-white">
                S
              </div>
            </label>
            <label>
              <input className="sr-only peer" name="size" type="radio" value="m" />
              <div className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer bg-yellow-50 text-slate-700 peer-checked:bg-yellow-600 peer-checked:text-white">
                M
              </div>
            </label>
            <label>
              <input className="sr-only peer" name="size" type="radio" value="l" />
              <div className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer bg-yellow-50 text-slate-700 peer-checked:bg-yellow-600 peer-checked:text-white">
                L
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizePicker;
