import React, { useEffect, useState } from "react";
import Button from "./Button";
import { BsArrowRight } from "react-icons/bs";
import sliderBedroom from "../assets/images/slider_bedroom.png";
import sliderDining from "../assets/images/slider_dining.png";
import sliderLiving from "../assets/images/slider_living.png";
import { SlArrowRight } from "react-icons/sl";
import { useSpring, animated, easings } from '@react-spring/web';
import { Link } from "react-router-dom";

export default function HomeSlider() {
  const [active, setActive] = useState(0);

  const [animationStyle, event] = useSpring(() =>({
    transform: 'translateX(0%)' ,
    config: { duration: 900, easing: easings.easeInOutQuad } 
  }));

  const slides = [
    {
      url: sliderBedroom,
      title: "Bed Room",
      to: "/shop/bedroom",
      content: "Inner Peace",
    },
    { url: sliderDining, title: "Living Room",to: "/shop/living", content: "Joyful Space" },
    {
      url: sliderLiving,
      title: "Dining Room",
      to: "/shop/dining",
      content: "Shared Taste",
    },
  ];

  const nextSlides = [
    slides[(active + 1) % slides.length],
    slides[(active + 2) % slides.length],
  ];

  const nextSlide = () => {
    setActive((active) => (active === slides.length - 1 ? 0 : active + 1));
    event.start({
      from:{transform: 'translateX(-40%)'},
      to:{transform: 'translateX(0%)'},      
    })
  };

  const dotClick=(index)=>{
      event.start({
        from:{transform: 'translateX(-40%)'},
        to:{transform: 'translateX(0%)'},      
      })
    setActive(index)
  }

  return (
    <section className="w-full my-10 bg-customLightYellow flex items-center relative max-lg:hidden">
      <div className="text-left w-5/12">
        <div className="w-1/2 mx-auto">
          <p className=" text-4xl font-bold text-customBlack">
            50+ Beautiful rooms inspiration
          </p>
          <p className="text-customGrey text-sm my-4">
            Our designer already made a lot of beautiful prototipe of rooms that
            inspire you
          </p>
          <Button
            link={"shop"}
            title={"Explore More"}
            onClick={() => window.scrollTo(0,0)}
            className={
              "bg-customStrongYellow py-3 px-6 text-white font-bold text-sm tracking-wider"
            }
          />
        </div>
      </div>
      <div className="flex gap-4 w-7/12">
        <div
          className="relative w-full h-screen transition-transform ease-out duration-1000"
          style={{
            transform: `translateX(-${active}%)`,
          }}
        >
          <img
            className="w-full h-full py-10"
            src={slides[active].url}
            alt="Alt"
          />
          <div className="bg-white py-7 px-6 absolute bottom-16 left-8 w-1/2 opacity-80">
            <div className="flex items-center gap-2 text-customBlack">
              <p>0{active + 1}</p>
              <p className="border border-customBlack w-6 h-0"></p>
              <p>{slides[active].title}</p>
            </div>
            <p className="text-left text-2xl text-black font-bold pt-2">
              {slides[active].content}
            </p>
          </div>
          <Link to={slides[active].to} onClick={() => window.scrollTo(0,0)} className="bg-customStrongYellow w-11 h-11 absolute bottom-16 left-[calc(2rem+50%)]">
            <BsArrowRight
              size={28}
              color="white"
              className="mx-auto relative top-1/2 -translate-y-1/2"
            />
          </Link>
        </div>

        <div className="w-full overflow-x-hidden">
          <div
            className={`flex gap-4 w-11/12 h-5/6 transition-transform ease-out duration-1000`}
            style={{
              transform: `translateX(-${active}%)`,
            }}
          >
            {nextSlides.map((item, index) => {
              return (
                <img key={index} className="w-full h-full pt-10" src={item.url} alt="Alt" />
              );
            })}
          </div>
          <ul className="h-1/6 w-full flex gap-6 pb-10 items-center px-4">
            {Array.from({ length: slides.length }).map((_, index) =>
              active === index ? (
                <animated.li
                  className="p-2 border rounded-full border-customStrongYellow cursor-pointer"
                  style={animationStyle}
                  key={slides.length}
                >
                  <div className="w-3 h-3 rounded-full bg-customStrongYellow"></div>
                </animated.li>
              ) : (
                <li
                  key={index}
                  className="w-3 h-3 rounded-full bg-gray-300 cursor-pointer"
                  onClick={() => dotClick(index)}
                ></li>
              )
            )}
          </ul>
        </div>
      </div>

      <div
        className="bg-white absolute p-4 rounded-full right-6 shadow-xl cursor-pointer active:shadow-2xl"
        onClick={nextSlide}
      >
        <SlArrowRight className="text-customStrongYellow font-bold" />
      </div>
    </section>
  );
}
