import React from "react";

const FormInput = React.memo(function FormInput({
  labelText,
  jsonText,
  type,
  requiredText,
  registerProps,
  errorsTitle,
}) {
  return (
    <>
      <div className="flex justify-between items-center pt-8 pb-2 w-4/5 mx-auto">
        <label htmlFor="">{labelText}: </label>
        <input
          type={type}
          className="py-1 px-3 w-3/5 h-full border-b focus:outline-none
               focus:border-black"
          {...registerProps(jsonText, { required: requiredText })}
        />
      </div>
      {errorsTitle && (
        <p className="w-1/5 text-red-600 text-left ps-5 mx-auto">
          {errorsTitle.message}
        </p>
      )}
    </>
  );
});

export default FormInput;