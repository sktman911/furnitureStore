import React, { useEffect, useState } from "react";
import { customerAPI } from "../../modules/apiClient";
import { format, parseISO } from "date-fns";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { LOGIN_USER } from "../../slice/userSlice";
import { useDispatch } from "react-redux";
import { errorMessage } from "../../constants/message";


export default function Profile({ id }) {
  const current = new Date();
  const maxDate = `${current.getFullYear()}-${(current.getMonth()+1).toString().padStart(2, '0')}-${current.getDate().toString().padStart(2, '0')}`;

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
      doB: "",
    },
  });

  
  const [edit, setEdit] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const renderInfo = (data) => {
      setValue("cusId", id);
      setValue("cusName", data.cusName);
      setValue("cusPhone", data.cusPhone);
      setValue("email", data.email);
      setValue("username", data.username);
      setValue("cusAddress", data.cusAddress);
      if(data.doB != null){
        setValue("doB", format(parseISO(data.doB), "yyyy-MM-dd"));
      }
  };

  const getInfo = async () => {
    if(!id){
      return;
    }
       await customerAPI()
        .GET_ID(id)
        .then((res) => {renderInfo(res.data); setLoading(true);})
        .catch((err) => console.log(err + "eror"));
        setLoading(true);     
  };

  useEffect(() => {
    getInfo();
  }, []);

  const editInfo = async (data) => {
    if (edit === true) {
      setEdit(false);
      return;
    }

    if(data.doB.length > 0){
      const today = new Date(Date.now());
      const birthday = new Date(data.doB);
      let year = today.getFullYear() - birthday.getFullYear();    
      const month = today.getMonth() - birthday.getMonth();
      if(year < 10 || (year === 10 && month < 0) || (month === 0 && today.getDate() < birthday.getDate())){
          errorMessage("Invalid age");
          return;
      }
      const isoDate = format(data.doB, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
      data.doB = isoDate;
    }
    else{
      data.doB = null;
    }

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
      {loading ? (<form onSubmit={handleSubmit(editInfo)}>
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

          <div className="w-1/3 max-lg:w-2/3 max-xl:w-2/5">
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

          <div className="w-1/3 max-lg:w-2/3 max-xl:w-2/5">
            <label className="text-left flex justify-start mb-1">
              Username:
            </label>
            <input
              type="text"
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
              {...register("cusAddress")}
              readOnly={edit}
            />
            {errors.cusAddress && (
              <p className="text-left text-red-600">
                {errors.cusAddress.message}
              </p>
            )}
          </div>
          <div className="w-1/3 max-lg:w-2/3 max-xl:w-2/5">
            <label className="text-left flex justify-start mb-1">
              Birthday:
            </label>
            <input
              type="date"
              max={maxDate}
              className="p-1 w-full  border rounded-md border-gray-400"
              {...register("doB")}
              readOnly={edit}
            />
            {errors.doB && (
              <p className="text-left text-red-600">
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
      </form>) : <div>Loading...</div>}
    </div>
    
  );
}
