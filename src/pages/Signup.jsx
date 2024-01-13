import React from "react";
import { Link } from "react-router-dom";

const Input = ({type, title}) => (
  <div className="relative my-5 w-40 text-sm text-white mx-auto">
    <input
      type={type}
      className="block w-full py-2 bg-transparent border-b-2 border-white 
            focus:outline-none appearance-none peer"
      placeholder=""
    />
    <label
      htmlFor=""
      className="absolute duration-300 transform left-0 scale-75 -translate-y-6 top-3
                origin-[0] peer-focus:left-0 peer-placeholder-shown:translate-y-0 
             peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100"
    >
      {title}
    </label>
  </div>
);

const Signup = () => {
  return (
    <>
      <div
        className="mt-36 mb-12 p-10 bg-slate-800 border shadow-lg
       border-slate-400 w-1/3 mx-auto rounded-md bg-opacity-90"
      >
        <h1 className="text-white text-3xl py-2 font-bold">Signup</h1>

        <div className="grid grid-cols-2">
          <Input type="text" title="Name"/>

          <div className="relative my-5 w-40 text-sm text-white mx-auto">
            <input
              type="date"
              className="block w-full py-2 bg-transparent border-b-2 border-white 
            focus:outline-none appearance-none peer"
              placeholder=""
            />
          </div>
        </div>

        <div className="grid grid-cols-2">
            <Input type="tel" title="Phone"/>

            <Input type="email" title="Email"/>
        </div>

        <div className="grid grid-cols-2">
            <Input type="text" title="Username"/>

            <Input type="password" title="Password"/>
        </div>

        <button
          className="w-80 py-2 border bg-white rounded-full my-6 hover:border
         hover:border-white hover:bg-slate-800 hover:bg-opacity-10 hover:text-white
        transition-colors duration-300"
        >
          Signup
        </button>
        <div>
          <span className="text-white">
            Already have account ?
            <Link to="/login" className="ml-2 hover:text-blue-600">
              Login
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Signup;
