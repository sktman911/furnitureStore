import React, { useEffect, useState } from "react";
import { customerAPI } from "../../modules/apiClient";
import { useSelector } from "react-redux";
import { format, parseISO, parse, formatISO } from "date-fns";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { LOGIN_USER } from "../../constants/userSlice";
import { useDispatch } from "react-redux";


export default function Profile({ id }) {
  const user = useSelector((state) => state.user);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue: {
      cusId: 0,
      cusName: "",
      cusPhone: "",
      email: "",
      username: "",
      cusAddress: "",
      doB: Date.now(),
    },
  });

  
  const [edit, setEdit] = useState(true);

  const dispatch = useDispatch();

  const renderInfo = (data) => {
    if (data != null) {
      setValue("cusId", id);
      setValue("cusName", data.cusName);
      setValue("cusPhone", data.cusPhone);
      setValue("email", data.email);
      setValue("username", data.username);
      setValue("cusAddress", data.cusAddress);
      setValue("doB", format(parseISO(data.doB), "dd-MM-yyyy"));
    }
  };

  const getInfo = async () => {

    if (user !== null) {
      await customerAPI()
        .GET_ID(id)
        .then((res) => renderInfo(res.data))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {

    getInfo();
  }, []);

  const editInfo = async (data) => {
    if (edit === true) {
      setEdit(false);
      return;
    }

    const date = parse(data.doB, "dd-MM-yyyy", new Date());
    const isoDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    data.doB = isoDate;

    await customerAPI()
      .PUT(id, data)
      .then((res) => {
        if (res.data.token) {
          sessionStorage.setItem("token", res.data.token);
          const decoded = jwtDecode(res.data.token);
          dispatch(LOGIN_USER(decoded));
        }
      })
      .catch((err) => console.log(err));
    setEdit(true);
  };

  return (
    <div className="w-full lg:w-2/3 my-5">
      <h2 className="text-2xl font-bold text-center lg:text-left w-3/4 mx-auto mb-2">
        Profile
      </h2>
      <form onSubmit={handleSubmit(editInfo)}>
        <div className="w-full lg:w-3/4 mx-auto rounded-lg flex flex-col lg:flex-row mb-2 lg:my-6 justify-between items-center">
          <div className="w-2/3 lg:w-1/2 mb-2 lg:mb-0">
            <label className="text-left flex justify-start mb-1">Name:</label>
            <input
              type="text"
              className="p-1 w-full  border rounded-md border-gray-400"
              {...register("cusName", { required: "Please fill name" })}
              readOnly={edit}
            />
            {errors.cusName && (
              <p className="w-2/4 text-red-600 text-right mx-auto">
                {errors.cusName.message}
              </p>
            )}
          </div>

          <div className="max-lg:w-2/3 max-xl:w-2/5">
            <label className="text-left flex justify-start mb-1">
              Phone number:
            </label>
            <input
              type="tel"
              className="p-1 w-full  border rounded-md border-gray-400"
              {...register("cusPhone", { required: "Please fill phone" })}
              readOnly={edit}
            />
            {errors.cusPhone && (
              <p className="w-2/4 text-red-600 text-right mx-auto">
                {errors.cusPhone.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full lg:w-3/4 mx-auto rounded-lg flex flex-col lg:flex-row mb-2 lg:my-6 justify-between items-center">
          <div className="w-2/3 lg:w-1/2 mb-2 lg:mb-0">
            <label className="text-left flex justify-start mb-1">Email:</label>
            <input
              type="text"
              className="p-1 w-full  border rounded-md border-gray-400"
              {...register("email", { required: "Please fill email" })}
              readOnly={edit}
            />
            {errors.email && (
              <p className="w-2/4 text-red-600 text-right mx-auto">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="max-lg:w-2/3 max-xl:w-2/5">
            <label className="text-left flex justify-start mb-1">
              Username:
            </label>
            <input
              type="tel"
              className="p-1 w-full  border rounded-md border-gray-400"
              {...register("username", { required: "Please fill username" })}
              readOnly={edit}
            />
            {errors.username && (
              <p className="w-2/4 text-red-600 text-right mx-auto">
                {errors.username.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full lg:w-3/4 mx-auto rounded-lg flex flex-col lg:flex-row mb-2 lg:my-6 justify-between items-center">
          <div className="w-2/3 lg:w-1/2 mb-2 lg:mb-0">
            <label className="text-left flex justify-start mb-1">
              Address:
            </label>
            <input
              type="text"
              className="p-1 w-full  border rounded-md border-gray-400"
              {...register("cusAddress", { required: "Please fill address" })}
              readOnly={edit}
            />
            {errors.cusAddress && (
              <p className="w-2/4 text-red-600 text-right mx-auto">
                {errors.cusAddress.message}
              </p>
            )}
          </div>
          <div className="max-lg:w-2/3 max-xl:w-2/5">
            <label className="text-left flex justify-start mb-1">
              Birthday:
            </label>
            <input
              type="tel"
              className="p-1 w-full  border rounded-md border-gray-400"
              {...register("doB", { required: "Please fill birthday" })}
              readOnly={edit}
            />
            {errors.doB && (
              <p className="w-2/4 text-red-600 text-right mx-auto">
                {errors.doB.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="bg-slate-700 text-white px-8 py-1 rounded-md mt-10"
          >
            {edit === true ? "Edit" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
