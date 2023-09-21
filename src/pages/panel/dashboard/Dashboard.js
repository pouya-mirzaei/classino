import React from 'react';
import UpcomingClasses from '../../../components/panel/upcoming-classes/UpcomingClasses';
import Features from '../../../components/features/Features';

export default function Dashboard() {
  return (
    <section className="p-section flex flex-wrap">
      <UpcomingClasses />
      <Features />
      <div className="basis-full md:basis-1/2 lg:basis-1/4 bg-lime-300 px-4">hello</div>
    </section>
  );
}
