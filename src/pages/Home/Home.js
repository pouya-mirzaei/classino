import React from 'react';
import HeroSection from '../../components/home/HeroSection';
import CoursesSection from '../../components/home/CoursesSection';
import TeachersSection from '../../components/home/TeachersSection';
import TopStudentsSection from '../../components/home/TopStudentsSection';
import Header from '../../components/home/Header';
import Socials from '../../components/home/Socials';
import Footer from '../../components/home/Footer';
import { logout } from '../../functions/Utilities';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CoursesSection />
        <TeachersSection />
        <TopStudentsSection />
        <Socials />
      </main>
      <Footer />
    </>
  );
}
