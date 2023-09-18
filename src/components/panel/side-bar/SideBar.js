import React from 'react';

export default function SideBar({ isOpen }) {
  return <div className={`side-bar${!isOpen ? ' hidden' : ''}`}>SideBar</div>;
}
