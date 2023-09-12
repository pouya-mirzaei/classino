import React from 'react';
import SocialAgencyBox from './SocialAgencyBox';

export default function Socials() {
  const agencyBox = [
    { id: 0, name: 'خبرگزاری زومیت', img: 'images/news-agency/1.png' },
    { id: 1, name: 'خبرگزاری تابناک', img: 'images/news-agency/2.png' },
    { id: 2, name: 'خبرگزاری دیجیاتو', img: 'images/news-agency/3.png' },
    { id: 3, name: 'خبرگزاری آخرین خبر', img: 'images/news-agency/4.png' },
    { id: 4, name: 'خبرگزاری عصر ایران', img: 'images/news-agency/5.png' },
  ];

  return (
    <section className="container px-5 md:p-0">
      <h2 className="heading-secondary text-center">کلاسینو در رسانه</h2>

      <div className="flex items-center justify-center gap-5 flex-wrap mt-5">
        {agencyBox.map((box) => (
          <SocialAgencyBox key={box.id} {...box} />
        ))}
      </div>
    </section>
  );
}
