import React from 'react'
import shipping from "../assets/images/category/shipping.svg"
import guarantee from "../assets/images/category/guarantee.svg"
import support from "../assets/images/category/support.svg"
import trophy from "../assets/images/category/trophy.svg"

const Info = () => {
  return (
    <div className="flex w-full mx-auto justify-around bg-yellow-50 py-16 gap-24">
    <div className="flex items-center gap-2">
      <img className="h-10" src={trophy} alt="" />
      <div className="flex flex-col text-left">
        <span className="font-bold">High Quality</span>
        <span className="text-gray-400 text-sm">crafted from top materials</span>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <img className="h-10"  src={guarantee} alt="" />
      <div className="flex flex-col text-left">
        <span className="font-bold">Warranty Protection</span>
        <span className="text-gray-400">Over 2 years</span>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <img className="h-10"  src={shipping} alt="" />
      <div className="flex flex-col text-left">
        <span className="font-bold">Free Shipping</span>
        <span className="text-gray-400">Order over 150 $</span>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <img className="h-10"  src={support} alt="" />
      <div className="flex flex-col text-left">
        <span className="font-bold">24 / 7 Support</span>
        <span className="text-gray-400">Dedicated support</span>
      </div>
    </div>
  </div>
  )
}

export default Info
