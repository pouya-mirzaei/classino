import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CoursesSection from './components/CoursesSection';
import TeachersSection from './components/TeachersSection';

export default function Home() {
  return (
    <>
      <Header></Header>
      <main>
        <HeroSection></HeroSection>
        <CoursesSection></CoursesSection>
        <TeachersSection></TeachersSection>
      </main>
    </>
  );
}
