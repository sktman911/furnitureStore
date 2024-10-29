import "./App.css";
import "react-toastify/dist/ReactToastify.css"


import { BrowserRouter} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./layouts/Layout";


function App() {


  return (
    <>
      <div className="text-center font-poppins">
        <BrowserRouter>       
        <ToastContainer />
          <Layout />
        </BrowserRouter>
    </div>
    </>


  );
}

export default App;
