import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import teachers from '../../../data/teachers';

export default function TeachersSection() {
  return (
    <section className="container px-5 md:p-0">
      <h2 className="heading-secondary text-center">مجموعه ای از بهترین اساتید کنکور ایران</h2>

      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          765: {
            slidesPerView: 2,
          },
          990: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
        className="mt-12">
        {teachers.map((teacher) => (
          <SwiperSlide className="w-48" key={teacher.id}>
            <div className="relative min-h-[230px] bg-gray-100 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-black/60 cursor-pointer transition-all">
              <figure>
                <img src={teacher.img} alt={teacher.name} className="w-full align-middle" />
                <figcaption className="absolute bottom-0 right-0 left-0 p-2.5 text-white bg-gradient-to-b from-transparent to-[#1c1c21] [text-shadow:_0_1px_1px_rgba(0_0_0_/_90%)] text-center">
                  <div className="font-extrabold text-lg">{teacher.name}</div>
                  <div className="mt-1 text-base opacity-80 font-medium">{teacher.role}</div>
                </figcaption>
              </figure>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}