import React from 'react';
import useCountDownTimer from '../hooks/useCountDownTimer';

export default function Timer() {
  const { days, hours, minutes, seconds, delta } = useCountDownTimer('29 june 2024');

  const percentageLeft = ((delta / (365 * 24 * 3600 * 1000)) * 100).toString().split('').slice(0, 4).join('');

  return (
    <div className="basis-7/12 w-full bg-white dark:bg-dark-1 rounded-xl shadow-md shadow-black/20">
      <div className="p-5">
        <h2 className="text-center dark:text-white text-base font-semibold">زمان باقی مانده تا کنکور 1403</h2>
        {/* count down */}
        <div className="flex flex-row-reverse justify-center gap-2 mt-4">
          <div className="flex flex-col items-center gap-y-2">
            <span className="text-[#20bf6b] text-2xl font-bold">{days}</span>
            <span className="text-gray-500 dark:text-gray-300 text-sm ">روز</span>
          </div>
          <span className="text-[#baa7a8] text-2xl font-bold">:</span>
          <div className="flex flex-col items-center gap-y-2">
            <span className="text-[#20bf6b] text-2xl font-bold">{hours}</span>
            <span className="text-gray-500 dark:text-gray-300 text-sm ">ساعت</span>
          </div>
          <span className="text-[#baa7a8] text-2xl font-bold">:</span>
          <div className="flex flex-col items-center gap-y-2">
            <span className="text-[#20bf6b] text-2xl font-bold">{minutes}</span>
            <span className="text-gray-500 dark:text-gray-300 text-sm ">دقیقه</span>
          </div>
          <span className="text-[#baa7a8] text-2xl font-bold">:</span>
          <div className="flex flex-col items-center gap-y-2">
            <span className="text-[#20bf6b] text-2xl font-bold">{seconds}</span>
            <span className="text-gray-500 dark:text-gray-300 text-sm ">ثانیه</span>
          </div>
        </div>
        {/* progress */}
        <div className="flex flex-col justify-center items-center">
          <div className="my-6">
            <h3 className="text-sm text-center dark:text-white font-semibold">
              {percentageLeft}% از زمان شما باقی مانده{' '}
            </h3>
          </div>
          <div className="relative w-[90%] h-5 bg-gray-300 dark:bg-dark-3 rounded-xl">
            <div
              className="absolute left-0 top-0 bottom-0 bg-[#20bf6b] rounded-xl transition-all ease-linear"
              style={{ width: Number(percentageLeft) + '%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
