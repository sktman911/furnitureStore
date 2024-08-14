import React from "react";

const FormSelect = React.memo(function FormSelect({
  labelText,
  options,
  jsonText,
  selected,
  setSelected,
  requiredText,
  registerProps,
  errorsTitle,
  labelKey,
  valueKey,
}) {
  return (
    <>
      <div className="flex justify-between items-center pt-8 pb-2 w-4/5 mx-auto">
        <label htmlFor="">{labelText}: </label>
        <select
          className="py-1 px-3 w-3/5 h-full border-b focus:outline-none
               focus:border-black"
          {...registerProps(jsonText, { required: requiredText })}
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">Choose {labelText}</option>
          {options.map((item, index) => (
            <option key={index} value={item[valueKey]}>
              {item[labelKey]}
            </option>
          ))}
        </select>
      </div>
      {errorsTitle && (
        <p className="w-2/5 text-red-600 text-right mx-auto">
          {errorsTitle.message}
        </p>
      )}
    </>
  );
});

export default FormSelect;
