import React, { useState } from 'react';

export default function Finance() {
  const [titleIndex, setTitleIndex] = useState(0);

  const titles = ['رسیدهای خرید', 'واریزی و پرداختی ', 'اقساط'];

  return (
    <div className="m-5">
      <Breadcrumb title={titles[titleIndex]} />

      <div className="grid md:grid-cols-3 gap-8 [&>*]:dark:text-white [&>*]:rounded-xl">
        {/*  */}
        <div className="md:col-span-2 bg-white dark:bg-dark-1 flex flex-col lg:flex-row items-center justify-center p-5 gap-10">
          <div className="lg:basis-1/2 h-4/5 flex flex-col items-center justify-around  gap-10 lg:border-l">
            <button className="text-white bg-tertiary-1 p-2.5 rounded-3xl text-sm">+ افزایش اعتبار</button>
            <div className="text-tertiary-1 text-2xl">
              <span> اعتبار (تراز مالی): </span>
              <span className="font-semibold">0 ریال</span>
            </div>
          </div>

          <div className="w-full lg:basis-1/2 h-4/5 flex flex-col items-center justify-center gap-7">
            <div className="w-4/5 flex items-center justify-between text-lg">
              <span>مجموع پرداختی ها:</span>
              <span className="font-semibold">0 ریال</span>
            </div>
            <div className="w-4/5 flex items-center justify-between text-lg">
              <span>مجموع پرداختی ها:</span>
              <span className="font-semibold">0 ریال</span>
            </div>
            <div className="w-4/5 flex items-center justify-between text-lg">
              <span>مجموع بدهی:</span>
              <span className="font-semibold">0 ریال</span>
            </div>
          </div>
        </div>

        <div className="secondary-logo-box">
          <img src="/images/classino_secondary_logo.png" alt="classino secondary logo" />
          <p className="text-center text-white font-semibold">دریافت اعتبار هدیه</p>
        </div>

        {titles.map((title, index) => (
          <div
            key={index}
            className={`text-center dark:text-white cursor-pointer text-lg font-medium p-10 ${
              titleIndex === index ? 'bg-primary-1 dark:bg-primary-2 text-white' : 'bg-white dark:bg-dark-1'
            }`}
            onClick={() => setTitleIndex(index)}>
            {title}
          </div>
        ))}
      </div>
    </div>
  );
}

function Breadcrumb({ title }) {
  return (
    <div className="block">
      <h1 className="dark:text-white">
        <span className="text-xl font-semibold ml-4">{title}</span>
        <span className="text-sm">امور مالی</span>
      </h1>
    </div>
  );
}
