import React, { useState, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import { IoClose } from "react-icons/io5";
import { productAPI } from "../../modules/api/api";

export default function ExcelForm(props) {
    const [isOpen, setIsOpen] = useState(true);
    const [file, setFile] = useState({});

    const formStyle = useSpring({
      opacity: isOpen ? 1 : 0, 
      transform: isOpen ? ' translate(-50%, -50%)' : 'translate(-50%, 80%)', 
      config: { tension: 100},
      from: isOpen ? {opacity: 0, transform: ' translate(-50%, -80%)'} : {opacity: 1, transform: ' translate(-50%, -50%)'}
    });
  
    const handleClose = useCallback(() => {
      setIsOpen(false);
      setTimeout(() => {
        props.closeForm(); 
      }, 400); 
    },[]);

    const importExcel = async () => {
      const formData = new   FormData();
      formData.append("file",file);
      await productAPI().IMPORT(formData).then(res => props.renderProducts).catch(err => console.log(err));
    }
  
    return (
      <>
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={handleClose}
        ></div>
        <animated.form
        style={formStyle}
          className="w-2/4 bg-white rounded-md mx-auto p-4 shadow-lg fixed top-1/2
             -translate-y-1/2 left-2/4 -translate-x-2/4 z-50"
        >
          <h1 className="font-semibold text-2xl py-4">Upload Excel</h1>
          <IoClose
            onClick={handleClose}
            className="absolute text-2xl top-3 right-4 cursor-pointer"
          />
  
            <div className="pt-8 pb-2 w-2/3 mx-auto">
              <label className="px-3">Excel File: </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                accept=".xlsx,.xls"
                className="py-1 px-3 w-3/5 h-full file:border-none file:px-2 file:py-1 file:rounded-md 
                file:bg-gray-200 file:cursor-pointer cursor-pointer bg-gray-200 rounded-lg file:text-black
                file:hover:text-white file:active:text-black"
              />
            </div>
  
          <button
            type="button"
            onClick={importExcel}
            className="p-3 bg-slate-800 text-white rounded-lg my-5"
          >
            Upload file
          </button>
        </animated.form>
      </>
    );
}
