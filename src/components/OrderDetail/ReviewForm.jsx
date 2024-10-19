import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { reviewAPI } from "../../modules/apiClient";

export default function ReviewForm(props) {
  const [rating, setRating] = useState();
  const [hover, setHover] = useState(null);
  const user = useSelector((state) => state.user);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reviewId: 0,
      comment: "",
      rating: rating,
      cusId: user?.cusId,
      productId: props.isOpen.productId,
      odId: props.isOpen.odId,
    },
  });

  const addReview = async (data) => {
    await reviewAPI()
      .POST(data)
      .then((res) => {
        if(res.status.valueOf(200)){
          props.getOrder();
          closeForm();
        }
        
      })
      .catch((err) => console.log(err));
  };

  const closeForm = useCallback(() => {
    props.setIsOpen({ state: false, item: "" });
    reset();
  }, [props, reset]);

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={closeForm}
      ></div>
      <form
        onSubmit={handleSubmit(addReview)}
        className="w-2/4 bg-white rounded-md mx-auto p-4 shadow-lg fixed top-1/2
           -translate-y-1/2 left-2/4 -translate-x-2/4 z-50"
      >
        <h1 className="font-semibold text-2xl py-4">Review</h1>
        <IoClose
          onClick={closeForm}
          className="absolute text-2xl top-3 right-4 cursor-pointer"
        />
        <div className="w-2/3 mx-auto my-1 flex gap-4">
          <label>Product:</label>
          <p>{props.isOpen.productName}</p>
        </div>
        <div className="w-2/3 mx-auto flex items-center gap-4">
          <label>Rating: </label>
          {[...Array(5)].map((star, index) => {
            const rateValue = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  className="hidden"
                  value={rateValue}
                  onClick={() => setRating(rateValue)}
                  {...register("rating", { required: "Please rate product" })}
                />
                <FaStar
                  size={20}
                  className="cursor-pointer"
                  color={rateValue <= (rating || hover) ? "yellow" : "gray"}
                  onMouseEnter={() => {
                    setHover(rateValue);
                  }}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
          {errors.rating && (
            <p className="text-red-600">{errors.rating.message}</p>
          )}
        </div>
        <div className="w-2/3 mx-auto">
          <label htmlFor="" className="block text-left my-2">
            Your Feedback:
          </label>
          <textarea
            className="w-full p-2 border-2 resize-none"
            rows={8}
            placeholder="Text here"
            {...register("comment")}
          ></textarea>
        </div>
        <button
          type="submit"
          className="p-3 bg-slate-800 text-white rounded-lg my-5"
        >
          Add
        </button>
      </form>
    </>
  );
}
