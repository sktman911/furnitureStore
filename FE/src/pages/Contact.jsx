import React from "react";
import background from "../assets/images/title_bg.webp";
import logo from "../assets/icons/web_logo.webp";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";
import {motion} from "framer-motion";


export default function Contact() {
  return (
    <motion.div className="mt-24" initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration: 0.1}} >
      <div className="relative">
        <img src={background} className="w-full h-full" alt="Background" />
        <div className="absolute text-center left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <img src={logo} className="mx-auto" alt="" />
          <h1 className="text-4xl font-bold py-3">Contact</h1>
          <div className="flex items-center justify-around">
            <span className="font-semibold">Home</span>
            <MdOutlineKeyboardArrowRight size={28} />
            <span>Contact</span>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <p className="font-bold text-2xl">Get In Touch With Us</p>
        <p className="w-1/2 mx-auto my-4 text-gray-400">
          For More Information About Our Product & Services. Please Feel Free To
          Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
          Hesitate!
        </p>
      </div>

      <div className="my-20 flex justify-center gap-10">
        <div className="w-1/4">
          <ul className="text-left">
            <li className="mt-5">
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt />
                <div>
                  <p className="font-semibold ">Address</p>
                  <p>District 6, Ho Chi Minh City, Viet Nam.</p>
                </div>
              </div>
            </li>
            <li className="mt-10">
              <div className="flex items-start gap-4">
                <FaPhoneAlt />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p>Mobile: + (84) 932199128</p>
                </div>
              </div>
            </li>
            <li className="mt-10">
              <div className="flex items-start gap-4">
                <FaClock />
                <div>
                  <p className="font-semibold">Working Time</p>
                  <p>Monday-Saturday: 8:00 - 21:00</p>
                  <p>Sunday: 8:00 - 11:00</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="w-1/4">
          <div className="flex flex-col text-left">
            <label htmlFor="" className="my-3">
              Your name
            </label>
            <input
              type="text"
              className="px-4 py-1 w-96 h-12 border-2 rounded-md"
            />
          </div>
          <div className="flex flex-col text-left">
            <label htmlFor="" className="mt-5 mb-3">
              Email address
            </label>
            <input
              type="email"
              className=" px-4 py-1 w-96 h-12 border-2 rounded-md"
            />
          </div>
          <div className="flex flex-col text-left">
            <label htmlFor="" className="mt-5 mb-3">
              Subject
            </label>
            <input
              type="text"
              className=" px-4 py-1 w-96 h-12 border-2 rounded-md"
            />
          </div>
          <div className="flex flex-col text-left">
            <label htmlFor="" className="my-3">
              Message
            </label>
            <textarea
              placeholder="Ask something..."
              className="px-4 py-2 resize-none border-2  rounded-md w-96 h-40"
              cols={5}
              id=""
            ></textarea>
          </div>

          <div className="text-left">
            <button className="py-2 px-20 rounded-md mt-14 bg-customStrongYellow text-white">
              Submit
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
