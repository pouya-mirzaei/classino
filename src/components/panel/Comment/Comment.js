import React, { useState } from 'react';
import './Rating.css';

export default function Comment({ session }) {
  const [comment, setComment] = useState('');
  return (
    <div>
      <h3 className="text-center font-medium mb-2">نظر شما در مورد {session.title}</h3>
      <span className="text-center inline-block mx-auto w-full text-[#70657b] dark:text-white/60 text-xs mb-5">
        امتیاز شما به این دوره از 1 تا 5 ستاره:
      </span>

      {/* rating */}
      <Rating />

      {/* Writing comment */}

      <div className="mt-7 space-y-10">
        <span className="text-center inline-block mx-auto w-full text-[#70657b] dark:text-white/60 text-xs">
          توضیحات (اختیاری) :
        </span>

        <textarea
          className="text-black w-full bg-[#dde7f5] dark:bg-dark-2 rounded-lg border border-[#d7d7d7] dark:border-dark-3 dark:text-white px-2.5 py-2"
          rows={10}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <button className=" w-full text-center bg-[#4caf50] text-white hover:bg-[#3d8b40] active:bg-[#397e3c] active:scale-95 duration-200 rounded-lg py-3 text-sm">
          ارسال نظر
        </button>
      </div>
    </div>
  );
}

function Rating() {
  return (
    <div className="rating">
      <input type="radio" name="rating" className="rating-5" id="rating-5" />
      <label htmlFor="rating-5">
        <svg>
          <use href="/sprite/hero.svg#rating-star"></use>
        </svg>
      </label>

      <input type="radio" name="rating" className="rating-4" id="rating-4" />
      <label htmlFor="rating-4">
        <svg>
          <use href="/sprite/hero.svg#rating-star"></use>
        </svg>
      </label>

      <input type="radio" name="rating" className="rating-3" id="rating-3" />
      <label htmlFor="rating-3">
        <svg>
          <use href="/sprite/hero.svg#rating-star"></use>
        </svg>
      </label>

      <input type="radio" name="rating" className="rating-2" id="rating-2" />
      <label htmlFor="rating-2">
        <svg>
          <use href="/sprite/hero.svg#rating-star"></use>
        </svg>
      </label>

      <input type="radio" name="rating" className="rating-1" id="rating-1" />
      <label htmlFor="rating-1">
        <svg>
          <use href="/sprite/hero.svg#rating-star"></use>
        </svg>
      </label>

      {/* emoji slider */}

      <div className="rating-slider">
        <div>
          <svg className="w-16">
            <use href="/sprite/hero.svg#emoji-0"></use>
          </svg>
        </div>
        <div>
          <svg className="w-16">
            <use href="/sprite/hero.svg#emoji-1"></use>
          </svg>
        </div>
        <div>
          <svg className="w-16">
            <use href="/sprite/hero.svg#emoji-2"></use>
          </svg>
        </div>
        <div>
          <svg className="w-16">
            <use href="/sprite/hero.svg#emoji-3"></use>
          </svg>
        </div>
        <div>
          <svg className="w-16">
            <use href="/sprite/hero.svg#emoji-4"></use>
          </svg>
        </div>
        <div>
          <svg className="w-16">
            <use href="/sprite/hero.svg#emoji-5"></use>
          </svg>
        </div>
      </div>
    </div>
  );
}
