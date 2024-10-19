import React from "react";
import des1 from "../../assets/images/des1.png";
import des2 from "../../assets/images/des2.png";

const Description = () => {
  return (
    <div>
      <div className="w-9/12 mx-auto my-8 flex flex-col gap-10 text-left text-gray-400 text-sm md:text-md">
        <p>
          Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn
          portable active stereo speaker takes the unmistakable look and sound
          of Marshall, unplugs the chords, and takes the show on the road.
        </p>
        <p>
          Weighing in under 7 pounds, the Kilburn is a lightweight piece of
          vintage styled engineering. Setting the bar as one of the loudest
          speakers in its class, the Kilburn is a compact, stout-hearted hero
          with a well-balanced audio which boasts a clear midrange and extended
          highs for a sound that is both articulate and pronounced. The analogue
          knobs allow you to fine tune the controls to your personal preferences
          while the guitar-influenced leather strap enables easy and stylish
          travel.
        </p>
      </div>

      <div className="w-10/12 flex flex-col lg:flex-row mx-auto justify-around gap-2">
        <img src={des1} className="bg-yellow-50 rounded-lg lg:w-1/2" alt="" />
        <img src={des2} className="bg-yellow-50 rounded-lg lg:w-1/2" alt="" />
      </div>
    </div>
  );
};

export default Description;
