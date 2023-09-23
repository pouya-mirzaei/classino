import React from 'react';
import NavLinkBox from './NavLinkBox';

export default function SideBar({ isOpen, onOpen }) {
  const links = [
    { id: 0, icon: 'mug-hot', name: 'میز مطالعه', href: 'dashboard' },
    { id: 1, icon: 'courses', name: 'درس های من', href: 'mycourselist' },
    { id: 2, icon: 'finance', name: 'امور مالی', href: 'finance' },
    { id: 3, icon: 'store', name: 'خرید درس', href: 'store' },
  ];

  return (
    <div className={`side-bar ${!isOpen ? ' hidden' : ''}`}>
      {links.map((link) => (
        <NavLinkBox {...link} key={link.id} onOpen={onOpen} />
      ))}
    </div>
  );
}
