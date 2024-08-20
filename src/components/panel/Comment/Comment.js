import React from 'react';
import './Rating.css';

export default function Comment({ session }) {
  return (
    <div>
      <h3 className="text-center font-medium mb-2">نظر شما در مورد {session.title}</h3>
      <span className="text-center inline-block mx-auto w-full text-[#70657b] text-sm mb-5">
        امتیاز شما به این دوره از 1 تا 5 ستاره:
      </span>

      {/* rating */}
      <Rating />
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
