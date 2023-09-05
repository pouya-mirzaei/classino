import React, { useEffect, useState } from 'react';

export default function PreLoader({ title }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full inset-0 ">
      <div className="w-[60px] h-[60px] relative flex items-center justify-center ">
        <div className="loader loader--1"></div>
        <div className="loader loader--2"></div>
        <div className="loader loader--3"></div>
      </div>
      <span className="text-primary-1 text-base font-bold inline-block">{title || 'کلاسینو'}</span>
    </div>
  );
}
