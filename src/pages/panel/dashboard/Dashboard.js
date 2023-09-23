import React, { useState } from 'react';
import UpcomingClasses from '../../../components/panel/upcoming-classes/UpcomingClasses';
import Features from '../../../components/features/Features';
import SocialBox from '../../../components/panel/social-box/SocialBox';

export default function Dashboard() {
  const [socialDetails, setsSocialDetails] = useState([
    {
      id: 1,
      name: 'آپارات',
      color: '#eb3b5a',
      link: 'https://www.aparat.com/classino_com',
      icon: 'aparat',
      socialId: 'classino_com@',
    },
    {
      id: 2,
      name: 'تلگرام',
      color: '#036af5',
      link: 'https://t.me/classino_com',
      icon: 'telegram',
      socialId: 'classino_com@',
    },
    {
      id: 3,
      name: 'اینستاگرام',
      color: '#eb3b5a',
      link: 'https://instagram.com/classino__com',
      icon: 'instagram',
      socialId: 'classino__com@',
    },
  ]);

  return (
    <section className="p-section mt-5 flex flex-col gap-5">
      {/* features */}
      <div className="flex flex-col lg:flex-row gap-5">
        <UpcomingClasses />
        <div className="flex flex-col basis-full lg:basis-2/3 md:flex-row gap-5 w-full">
          <Features />
          <div className="basis-full md:basis-1/2 lg:basis-1/3">
            <div className="diamond-bg">
              <div className="diamond-bg__content">
                <img src="/images/classinoLogoWhite.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div>
        <footer className="flex flex-wrap [&>*]:grow gap-10 w-full">
          {socialDetails.map((box) => (
            <SocialBox key={box.id} {...box} />
          ))}
        </footer>
      </div>
    </section>
  );
}
