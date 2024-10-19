import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { authAPI } from "../modules/apiClient";

const Input = (props) => (
  <div className="relative my-5 w-40 text-sm text-white mx-auto">
    <input
      type={props.type}
      className="block w-full py-2 bg-transparent border-b-2 border-white 
            focus:outline-none appearance-none peer"
      autoComplete="off"
      placeholder=""
      {...props.register(`${props.field}`, {
        required: `Please fill ${props.title}`,
      })}
    />
    {props.errors && (
      <p className="my-1 text-red-500 text-left">
        {props.errors.message}
      </p>
    )}
    <label
      htmlFor=""
      className="absolute duration-300 transform left-0 scale-75 -translate-y-6 top-3
                origin-[0] peer-focus:left-0 peer-placeholder-shown:translate-y-0 
             peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100"
    >
      {props.title}
    </label>
  </div>
);

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue: {
      cusName: "",
      cusPhone: "",
      username: "",
      password: "",
      email: "",
    },
  });

  const navigate = useNavigate();

  const signup = (data) => {
    console.log(data)
    authAPI()
      .SIGNUP(data)
      .then((res) => {
        navigate("/login",{replace:true})
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(signup)}>
      <div
        className="mt-36 mb-12 p-10 bg-slate-800 border shadow-lg
       border-slate-400 w-1/3 mx-auto rounded-md bg-opacity-90"
      >
        <h1 className="text-white text-3xl py-2 font-bold">Signup</h1>

        <div className="grid grid-cols-2">
          <Input
            type="text"
            title="Name"
            register={register}
            errors={errors.cusName}
            field="cusName"
          />

          <div className="relative my-5 w-40 text-sm text-white mx-auto">
            <input
              max={Date.now()}
              type="date"
              className="block w-full py-2 bg-transparent border-b-2 border-white 
            focus:outline-none appearance-none peer"
              placeholder=""
            />
          </div>
        </div>

        <div className="grid grid-cols-2">
          <Input
            type="tel"
            title="Phone"
            register={register}
            errors={errors.cusPhone}
            field="cusPhone"
          />

          <Input
            type="email"
            title="Email"
            register={register}
            errors={errors.email}
            field="email"           
          />
        </div>

        <div className="grid grid-cols-2">
          <Input
            type="text"
            title="Username"
            register={register}
            errors={errors.username}
            field="username"
          />

          <Input
            type="password"
            title="Password"
            register={register}
            errors={errors.password}
            field="password"
          />
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
    </form>
  );
};

export default Signup;
