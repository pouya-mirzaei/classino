import React from 'react';
import PrimaryHeading from '../../../components/panel/PrimaryHeading';
import PanelDetail from '../../../components/panel/PanelDetail/PanelDetail';
import './Profile.css';
import EditProfile from './EditProfile';
import UpdatePassword from './UpdatePassword';
export default function Profile() {
  return (
    <section className="p-section">
      <PrimaryHeading>ویرایش پروفایل</PrimaryHeading>

      <div className="flex flex-col items-start lg:flex-row gap-8 w-full">
        <PanelDetail headerTitle="تغییر مشخصات کاربری" className="basis-1/2 w-full relative">
          <EditProfile />
        </PanelDetail>
        <PanelDetail headerTitle="تغییر رمز عبور" className="basis-1/2 w-full relative">
          <UpdatePassword />
        </PanelDetail>
      </div>
    </section>
  );
}
