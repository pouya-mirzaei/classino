import React, { useContext } from 'react';
import SecondaryHeading from '../SecondaryHeading';
import PreLoader from '../../PreLoader';
import { useCart } from '../../../hooks/api/useCart';
import useAuth from '../../../hooks/api/useAuth';

export default function CheckOut({ isPending }) {
  const { totalPrice, taxToPay, finalPrice } = useCart();
  const {
    user: { credit_balance },
  } = useAuth();
  const TAX = 10;

  return (
    <>
      <div className="grow space-y-5">
        <SecondaryHeading>صورت حساب</SecondaryHeading>
        <div className="relative bg-[#f6f8fc] dark:bg-dark-1 dark:text-white rounded-md shadow-md shadow-black/20 p-5">
          <PreLoader title="در حال محاسبه" pending={isPending} />
          <div className="flex gap-5 my-5">
            <span className="basis-1/2 text-xs font-bold text-gray-600 dark:text-white">مجموع: </span>
            <span className="basis-1/2 font-bold text-sm">{totalPrice()?.toLocaleString('fa-ir')} ریال</span>
          </div>
          <div className="flex gap-5 relative mb-12">
            <span className="basis-1/2 text-xs font-bold text-gray-600 dark:text-white">مالیات بر ارزش افزوده: </span>
            <span className="basis-1/2 font-bold text-sm">{taxToPay(TAX)?.toLocaleString('fa-ir')} ریال</span>
            <span className="text-xs absolute right-1/2 top-full mt-2">({TAX}% مبلغ کل)</span>
          </div>
          <div className="flex gap-5 mb-6">
            <span className="basis-1/2 text-sm font-bold text-primary-1 dark:text-white">مبلغ نهایی:</span>
            <span className="basis-1/2 font-bold text-base text-primary-1">{finalPrice(TAX)?.toLocaleString('fa-ir')} ریال</span>
          </div>
          <div className="flex gap-5 mb-5">
            <span className="basis-1/2 text-xs font-bold text-gray-600 dark:text-white">اعتبار شما:</span>
            <span className="basis-1/2 font-bold text-sm">{credit_balance.toLocaleString('fa-ir')} ریال</span>
          </div>
          <div className="flex gap-5 mb-5">
            <span className="basis-1/2 text-xs font-bold text-gray-600 dark:text-white">قابل پرداخت</span>
            <span className="basis-1/2 font-bold text-sm border border-black dark:border-white p-2">
              {finalPrice(TAX)?.toLocaleString('fa-ir')} ریال
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
