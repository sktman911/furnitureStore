import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";

import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { LOGIN_USER } from "../reducer/userSlice";
import { errorMessage } from "../constants/message";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const url = "https://localhost:7183/api/Authentication/";
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          const decoded = jwtDecode(res.data.token);
          dispatch(LOGIN_USER(decoded));
          if(decoded.role)
              navigate("/admin")
          else navigate("/")
        }else{
          errorMessage("Username or password is not correct")
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-36 mb-12 p-10 bg-slate-800 border shadow-lg
       border-slate-400 w-1/3 mx-auto rounded-md bg-opacity-90"
      >
        <h1 className="text-white text-3xl py-2 font-bold">Login</h1>
        <div className="relative my-5 w-80 text-sm text-white mx-auto">
          <input
            type="text"
            className="block w-full py-2 bg-transparent border-b-2 border-white 
            focus:outline-none appearance-none peer "
            placeholder=""
            autoComplete="off"
            {...register("username", { required: "Please fill username" })}
          />
          {errors.username && (
            <p className="my-1 text-red-500 text-left">
              {errors.username.message}
            </p>
          )}
          <label
            className="absolute duration-300 transform left-0 scale-75 -translate-y-6 top-3
                origin-[0] peer-focus:left-0 peer-placeholder-shown:translate-y-0 
             peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100"
          >
            Username
          </label>
        </div>
        <div className="relative my-5 w-80 text-sm text-white mx-auto">
          <input
            type="password"
            className="block w-full py-2 bg-transparent border-b-2 border-white 
            focus:outline-none appearance-none peer"
            placeholder=""
            {...register("password", { required: "Please fill password" })}
            autoComplete="off"
          />
          {errors.password && (
            <p className="my-1 text-red-500 text-left">
              {errors.password.message}
            </p>
          )}
          <label
            className="absolute duration-300 transform left-0 scale-75 -translate-y-6 top-3
             origin-[0] peer-focus:left-0 peer-placeholder-shown:translate-y-0 
             peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100"
          >
            Password
          </label>
        </div>
        <div className="w-80 flex justify-between mx-auto text-white items-center">
          <div className="flex gap-2 items-center">
            <input type="checkbox" />
            <label htmlFor="">Remember me</label>
          </div>
          <Link to="" className="hover:text-blue-600">
            Forgot Password ?
          </Link>
        </div>
        <button
          type="submit"
          className="w-80 py-2 border bg-white rounded-full my-6 hover:border
         hover:border-white hover:bg-slate-800 hover:bg-opacity-10 hover:text-white
        transition-colors duration-300"
        >
          Login
        </button>
        <div>
          <span className="text-white">
            Don't have account ?
            <Link to="/signup" className="ml-2 hover:text-blue-600">
              Signup
            </Link>
          </span>
        </div>
      </form>
    </>
  );
};

export default Login;
