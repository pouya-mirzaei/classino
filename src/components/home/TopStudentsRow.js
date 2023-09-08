import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

export default function TopStudentsRow({ year }) {
  return (
    <div className="container">
      {/* title */}
      <h3 className="text-white text-[27px] text-center font-semibold">
        رتبه های برتر کلاسینو در <span className="text-secondary-2 font-bold">کنکور {year}</span>
      </h3>

      {/* slider */}
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false, stopOnLastSlide: true }}
        breakpoints={{
          765: {
            slidesPerView: 2,
          },
          990: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
        className="relative mt-12 w-4/5">
        <SwiperSlide className="student">slide1</SwiperSlide>
        <SwiperSlide className="student">slide1</SwiperSlide>
        <SwiperSlide className="student">slide1</SwiperSlide>
        <SwiperSlide className="student">slide1</SwiperSlide>
        <SwiperSlide className="student">slide1</SwiperSlide>
        <SwiperSlide className="student student-contact">
          <div className="text-white flex flex-col items-center">
            <svg className="h-28">
              <use href="sprite/hero.svg#plus-user"></use>
            </svg>
            <span className="text-center font-semibold text-lg text-[#1e1e1e]">اینجا جای شماست !</span>
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            <button className="btn-panel bg-gradient-to-t from-primary-1 to-[#07a3fb] text-white w-4/5">
              ثبت نام رایگان
            </button>
            <button className="btn-panel bg-gray-200 text-[#1f1f1f] shadow-md shadow-black/20 border-none">
              تماس با پشتیبانی
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
      {/* navigate btn */}
      <button className="mt-10 mx-auto block btn-panel text-[#1e1e1e]/80 border border-[#da7c0c] bg-gradient-to-t from-secondary-1 to-secondary-2">
        نمایش رتبه های برتر {year}
      </button>
    </div>
  );
}
