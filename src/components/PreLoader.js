import React, { useEffect } from 'react';
import { useState } from 'react';
export default function PreLoader({ duration = 3000, title }) {
  const [displayLoader, setDisplayLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDisplayLoader(false);
    }, duration);
  }, []);

  return (
    <>
      {displayLoader && (
        <div className="flex flex-col justify-center items-center absolute z-50 inset-0 ">
          <div className="w-[60px] h-[60px] relative z-[60] flex items-center justify-center ">
            <div className="loader loader--1"></div>
            <div className="loader loader--2"></div>
            <div className="loader loader--3"></div>
          </div>
          <span className="text-primary-1 text-base font-bold inline-block relative z-[60]">{title || 'کلاسینو'}</span>

          {/* blue bg */}
          <div className="absolute z-50 inset-0 bg-slate-100 backdrop-blur-sm"></div>
        </div>
      )}
    </>
  );
}
