import { toast } from "react-toastify";

const successMessage = (text) =>{
    toast.success(text, {
        position: "top-center",
        autoClose: 1500,
        theme: "colored",
      });
}

const errorMessage = (text) =>{
    toast.error(text, {
        position: "top-center",
        autoClose: 1500,
        theme: "colored",
      });
}

export {successMessage, errorMessage}