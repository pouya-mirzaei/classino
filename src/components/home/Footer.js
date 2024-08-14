import React from 'react';
import Copyright from '../Copyright';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      {/* links */}
      <div className="container flex flex-col lg:flex-row gap-10 items-center justify-around py-20 text-center">
        <div>
          <h3 className="font-bold text-lg mb-7">لینک های مهم</h3>
          <ul className="space-y-5 [&>*]:text-black/70 hover:[&>*]:text-secondary-1 [&>*]:transition-all">
            <li>
              <Link to="/">دوره ها در یک نگاه</Link>
            </li>
            <li>
              <Link to="/">شرایط و قوانین کلاسینو</Link>
            </li>
            <li>
              <Link to="/">نمونه کلاس های برگزار شده</Link>
            </li>
            <li>
              <Link to="/">نرم افزار های مورد نیاز</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-7">کلاسینو</h3>
          <ul className="space-y-5 [&>*]:text-black/70 hover:[&>*]:text-secondary-1 [&>*]:transition-all">
            <li>
              <Link to="/">درباره کلاسینو</Link>
            </li>
            <li>
              <Link to="/">تماس با کلاسینو</Link>
            </li>
            <li>
              <Link to="/">کادر دبیران کلاسینو</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* copyright */}
      <Copyright />
    </footer>
  );
}
