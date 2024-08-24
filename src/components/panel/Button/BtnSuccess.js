import React from 'react';

export default function BtnSuccess({ children }) {
  return (
    <button className="w-full text-center bg-[#4caf50] text-white hover:bg-[#3d8b40] active:bg-[#397e3c] active:scale-95 duration-200 rounded-lg py-3 text-sm">
      {children}
    </button>
  );
}
