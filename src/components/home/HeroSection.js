import React from 'react';

export default function HeroSection() {
  return (
    <section className="container">
      {/* hero section */}

      <div className="flex items-center justify-between gap-x-5">
        {/* image */}
        <div className="basis-1/2 hidden lg:inline-block">
          <img src="images/lcp.png" alt="classino lcp" />
        </div>

        {/* info */}

        <div className="basis-full lg:basis-1/2 flex justify-center items-center flex-col text-center lg:text-right">
          <h1 className="text-3xl lg:text-4xl font-black ">
            <span className="block">کلاسینو اولین و قوی‌ترین </span>
            <span className="block">آموزشگاه آنلاین ابتدایی تا کنکور</span>
          </h1>

          <div className="basis-1/2 lg:hidden">
            <img src="images/lcp.png" alt="classino lcp" />
          </div>

          <p className="leading-10 text-lg mt-2.5 font-medium">
            کلاسینو آموزشگاه آنلاینی هست که مجازی سرکلاس حاضر میشی، به صورت زنده با استاد حرف میزنی، تکالیف و آزمون ها
            جدی پیگیری میشن و از هر جای دنیا میتونی به کلاسینو دسترسی پیدا کنی.
          </p>
        </div>
      </div>
    </section>
  );
}
