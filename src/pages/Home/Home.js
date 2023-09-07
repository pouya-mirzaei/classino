import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CoursesSection from './components/CoursesSection';

export default function Home() {
  return (
    <>
      <Header></Header>
      <main>
        <HeroSection></HeroSection>
        <CoursesSection></CoursesSection>
      </main>
    </>
  );
}
