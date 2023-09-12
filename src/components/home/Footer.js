import React from 'react';

export default function Footer() {
  return (
    <footer>
      {/* links */}
      <div className="container flex flex-col lg:flex-row gap-10 items-center justify-around py-20 text-center">
        <div>
          <h3 className="font-bold text-lg mb-7">لینک های مهم</h3>
          <ul className="space-y-5 [&>*]:text-black/70 hover:[&>*]:text-secondary-1 [&>*]:transition-all">
            <li>
              <a href="#">دوره ها در یک نگاه</a>
            </li>
            <li>
              <a href="#">شرایط و قوانین کلاسینو</a>
            </li>
            <li>
              <a href="#">نمونه کلاس های برگزار شده</a>
            </li>
            <li>
              <a href="#">نرم افزار های مورد نیاز</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-7">کلاسینو</h3>
          <ul className="space-y-5 [&>*]:text-black/70 hover:[&>*]:text-secondary-1 [&>*]:transition-all">
            <li>
              <a href="#">درباره کلاسینو</a>
            </li>
            <li>
              <a href="#">تماس با کلاسینو</a>
            </li>
            <li>
              <a href="#">کادر دبیران کلاسینو</a>
            </li>
          </ul>
        </div>
      </div>
      {/* copyright */}
      <div className="w-full py-6 bg-[#dfdfdf] text-center px-2">
        تمامی حقوق مادی و معنوی محفوظ میباشد. (ساخته شده با <span>❤️ کلاسینو</span>)
      </div>
    </footer>
  );
}
