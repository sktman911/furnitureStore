import { React } from "react";
import { footerLinks, footerHelps } from "../constants";

const Footer = () => {


  return (
    <section className=" max-container">
      <hr />
      <div>
        <ul className="grid grid-cols-4 gap-4 w-4/5 mx-auto py-10">
          <li className="text-left">
            <h2 className=" font-extrabold text-xl">Funiro.</h2>
            <p className=" mt-16 text-gray-400">
              400 University Drive Suite 200 Coral Gables,
            </p>
            <p className="text-gray-400">FL 33134 USA</p>
          </li>
          <li className=" w-1/2 mx-auto text-left">
            <h2 className=" text-gray-400 pb-6 text-lg">Links</h2>
            <ul>
              {footerLinks.map((link, index) => (
                <li key={index} className="text-sm font-bold py-6">
                  {link.name}
                </li>
              ))}
            </ul>
          </li>
          <li className=" w-1/2 mx-auto text-left">
            <h2 className=" text-gray-400 pb-6 text-lg">Help</h2>
            <ul>
              {footerHelps.map((link, index) => (
                <li key={index} className="text-sm font-bold py-6">
                  {link.name}
                </li>
              ))}
            </ul>
          </li>
          <li className=" w-full mx-auto text-left">
            <h4 className=" text-gray-400 pb-6 text-lg">Newsletter</h4>
            <div className="pt-6">
              <input
                type="email"
                className=" text-sm border-b-2 w-4/6 border-black outline-none"
                placeholder="Enter Your Email Address"
              />
              <a to="/home" className="ms-2 border-b-2 border-black">
                SUBSCRIBE
              </a>
            </div>
          </li>
        </ul>
        <hr className=" border-b-2 w-4/5 mx-auto" />
        <div className="w-4/5 mx-auto text-left py-8">
          <span>2023 furino. All rights reverved</span>
        </div>
      </div>
    </section>
  );
};

export default Footer;
