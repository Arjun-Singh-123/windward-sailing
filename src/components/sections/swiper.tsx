"use client";
// // import Swiper core and required modules
// import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

// export default () => {
//   return (
//     <Swiper
//       // install Swiper modules
//       modules={[Navigation, Pagination, Scrollbar, A11y]}
//       spaceBetween={50}
//       slidesPerView={3}
//       navigation
//       pagination={{ clickable: true }}
//       scrollbar={{ draggable: true }}
//       onSwiper={(swiper) => console.log(swiper)}
//       onSlideChange={() => console.log("slide change")}
//     >
//       <SwiperSlide>Slide 1</SwiperSlide>
//       <SwiperSlide>Slide 2</SwiperSlide>
//       <SwiperSlide>Slide 3</SwiperSlide>
//       <SwiperSlide>Slide 4</SwiperSlide>
//       ...
//     </Swiper>
//   );
// };
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
const images = [
  "d.jpg",
  "e.jpg",
  "f.jpeg",
  "c.jpg",
  "d.jpg",
  "e.jpg",
  "f.jpeg",
  "c.jpg",
  "d.jpg",
  "e.jpg",
  "f.jpeg",
  "c.jpg",
];
export default function Swipe() {
  return (
    <Swiper>
      {images.map((i, el) => {
        return (
          <SwiperSlide>
            Slide {el}
            <img src={`/images/${i}`} alt="" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
