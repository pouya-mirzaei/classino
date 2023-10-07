import React from 'react';

export default function Store() {
  const badgeData = [
    { id: 0, img: '/images/doreh/DoreJameDahomEshteraki1403-Big.8fd2f5b9.png' },
    { id: 1, img: '/images/doreh/DoreJameDahomYazdahom1403-Big.d762d1a1.png' },
    { id: 2, img: '/images/doreh/DoreJameDavazdahom1403-Big.e2f16463.png' },
    { id: 3, img: '/images/doreh/DoreJameKonkoor1403-Big.4ddc5616.png' },
    { id: 4, img: '/images/doreh/DoreJamePanjomTaNohom1403-Big.81a8226b.png' },
    { id: 5, img: '/images/doreh/zabaninopng.png' },
  ];

  return (
    <div className="m-5">
      <h1 className="text-xl dark:text-white font-semibold">فروشگاه</h1>

      {/* badge section */}
      <section className="m-0 flex flex-wrap items-center justify-around">
        {badgeData.map((box) => (
          <BadgeBox key={box.id} {...box} />
        ))}
      </section>

      {/* store */}
      <section>
        <div></div>
      </section>
    </div>
  );
}

function BadgeBox({ img }) {
  return (
    <div className="w-[200px] m-2.5 transition-all duration-300 rounded-md overflow-hidden shadow-md hover:shadow-lg shadow-black/20 hover:scale-110 cursor-pointer">
      <img src={img} alt="course box" />
    </div>
  );
}
