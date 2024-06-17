import { FaCheckCircle } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import Button from "../components/Button";
import { useLocation } from "react-router";

const PaymentReturn = () => {
  const param = useLocation();
  const selectParam = new URLSearchParams(param.search);
  const success = selectParam.get("success");

  return (
    <>
      <div className="mt-24">
        {success === "true" ? (
          <FaCheckCircle className=" text-green-400 w-28 h-28 mx-auto mt-32 mb-8" />
        ) : (
          <ImCancelCircle className=" text-red-400 w-28 h-28 mx-auto mt-32 mb-8" />
        )}

        <h1 className=" text-2xl font-semibold">Checkout successfully</h1>

        <div>
          <Button
            link="/"
            type="button"
            className=" text-yellow-600 border border-yellow-600
       hover:text-white hover:border-white py-3 text-sm hover:bg-yellow-600
       active:bg-yellow-700 px-14 my-8 w-60 rounded-lg"
            title="View History"
          ></Button>
        </div>

        <div>
          <Button
            link="/home"
            type="button"
            className=" text-yellow-600 border border-yellow-600
       hover:text-white hover:border-white py-3 text-sm hover:bg-yellow-600
       active:bg-yellow-700 px-14 mb-8 w-60 rounded-lg"
            title="Back to Home"
          ></Button>
        </div>
      </div>
    </>
  );
};

export default PaymentReturn;
