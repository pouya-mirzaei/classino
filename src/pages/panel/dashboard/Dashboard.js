import React from 'react';
import UpcomingClasses from '../../../components/panel/upcoming-classes/UpcomingClasses';
import Features from '../../../components/features/Features';

export default function Dashboard() {
  return (
    <section className="p-section flex flex-wrap gap-y-5 mt-5">
      <UpcomingClasses />
      <Features />
      <div className="basis-full md:basis-1/2 lg:basis-1/4 px-4">
        <div className="diamond-bg">
          <div className="diamond-bg__content">
            <img src="/images/classinoLogoWhite.svg" />
          </div>
        </div>
      </div>
    </section>
  );
}
