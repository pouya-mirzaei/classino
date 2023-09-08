import React from 'react';
import HeroSection from '../../components/home/HeroSection';
import CoursesSection from '../../components/home/CoursesSection';
import TeachersSection from '../../components/home/TeachersSection';
import TopStudentsSection from '../../components/home/TopStudentsSection';
import Header from '../../components/home/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CoursesSection />
        <TeachersSection />
        <TopStudentsSection />
      </main>
    </>
  );
}
