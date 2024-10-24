import React from "react";
import avatar from "../../assets/images/default_avatar.png";
import { FaStar } from "react-icons/fa";

export default function Review(props) {
  const { reviews } = props;
  return (
    <div>
      <div>
        <h2 className="font-bold text-2xl mb-2 mt-8">All Review</h2>
      </div>
      {reviews !== null ? (
        
        <div className="w-1/2 mx-auto my-4 flex flex-col gap-10 text-left text-gray-400 text-sm md:text-md">
          {reviews.map((review, index) => (
            <div key={index} className="flex items-start h-auto">
              <div className="w-1/3">
                <p className="text-center text-xs my-1">
                  {Intl.DateTimeFormat('us', {dateStyle: 'medium',timeStyle: 'short'}).format(new Date(review.reviewedDate+'Z'))}
                </p>
                <img className="w-14 h-14 mx-auto" src={avatar} alt="Alt" />
              </div>
              <div className="break-words w-full">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-black">
                    {review.customer.cusName}
                  </span>
                  <span className="flex gap-1">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={
                          index < review.rating
                            ? "text-yellow-300"
                            : "text-gray-400"
                        }
                      />
                    ))}
                  </span>
                </div>
                <p className="text-md text-black px-2 py-3 bg-gray-200 w-full rounded-lg my-3">
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-1/2 mx-auto">Loading...</div>
      )}
    </div>
  );
}
