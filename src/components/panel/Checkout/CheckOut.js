import React, { useContext, useEffect } from 'react';
import SecondaryHeading from '../SecondaryHeading';
import PreLoader from '../../PreLoader';
import { useCart } from '../../../hooks/api/useCart';
import useAuth from '../../../hooks/api/useAuth';

export default function CheckOut({ isPending, cart }) {
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
            <span className="basis-1/2 font-bold text-sm">{cart.totalPrice()?.toLocaleString('fa-ir')} ریال</span>
          </div>
          <div className="flex gap-5 relative mb-12">
            <span className="basis-1/2 text-xs font-bold text-gray-600 dark:text-white">مالیات بر ارزش افزوده: </span>
            <span className="basis-1/2 font-bold text-sm">{cart.taxToPay(TAX)?.toLocaleString('fa-ir')} ریال</span>
            <span className="text-xs absolute right-1/2 top-full mt-2">({TAX}% مبلغ کل)</span>
          </div>
          <div className="flex gap-5 mb-6">
            <span className="basis-1/2 text-sm font-bold text-primary-1 dark:text-white">مبلغ نهایی:</span>
            <span className="basis-1/2 font-bold text-base text-primary-1">
              {(cart.totalPrice() + cart.taxToPay(TAX))?.toLocaleString('fa-ir')} ریال
            </span>
          </div>
          {cart.discount > 0 && (
            <div className="flex gap-5 mb-6">
              <span className="basis-1/2 text-sm font-bold text-secondary-1 dark:text-white flex items-center gap-2">
                کد تخفیف:
                <span className="underline flex items-center cursor-pointer gap-1" onClick={cart.removeDiscount}>
                  ({cart.discountCode})
                  <svg className="text-red-600 w-4 h-4 hover:text-red-800 transition-colors duration-200 ease-in-out">
                    <use href="/sprite/hero.svg#trash"></use>
                  </svg>
                </span>
              </span>
              <div className="basis-1/2 flex flex-col text-secondary-1">
                <span className="font-bold text-sm">{cart.discountAmount(TAX).toLocaleString('fa-ir')} ریال</span>
                <span className="text-xs">({cart.discount}% تخفیف)</span>
              </div>
            </div>
          )}

          <div className="flex gap-5 mb-5">
            <span className="basis-1/2 text-xs font-bold text-gray-600 dark:text-white">اعتبار شما:</span>
            <span className="basis-1/2 font-bold text-sm">{credit_balance.toLocaleString('fa-ir')} ریال</span>
          </div>
          <div className="flex gap-5 mb-5">
            <span className="basis-1/2 text-xs font-bold text-gray-600 dark:text-white">قابل پرداخت</span>
            <span className="basis-1/2 font-bold text-sm border border-black dark:border-white p-2">
              {(cart.finalPrice(TAX) - credit_balance < 0 ? '0' : cart.finalPrice(TAX) - credit_balance).toLocaleString('fa-ir')}{' '}
              ریال
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
