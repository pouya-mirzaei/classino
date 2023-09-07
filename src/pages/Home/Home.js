import React from 'react';
import Header from './components/Header';
import HeroSection from './components/sections/hero/HeroSection';
import CoursesSection from './components/sections/courses/CoursesSection';

export default function Home() {
  return (
    <>
      <Header></Header>
      <HeroSection></HeroSection>
      <CoursesSection></CoursesSection>
    </>
  );
}
