import React, { useState } from 'react';

import PanelDetail from '../../../components/panel/PanelDetail/PanelDetail';
import SecondaryHeading from '../../../components/panel/SecondaryHeading';
import { useFormik } from 'formik';
import PreLoader from '../../../components/PreLoader';
import useAuth from '../../../hooks/api/useAuth';
import { toast } from 'react-toastify';

export default function IncreaseCredit() {
  const [isUpdating, setUpdating] = useState(false);

  const { increaseCreditBalance } = useAuth();

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
    initialValues: {
      amount: '',
    },
    onSubmit: (values, { resetForm }) => {
      setUpdating(true);
      increaseCreditBalance.mutate(values.amount, {
        onSuccess: () => {
          toast.success('اعتبار شما با موفقیت افزایش یافت', {
            className: 'font-primary text-xs',
          });
        },
        onError: (error) => {
          toast.error(error.message, {
            className: 'font-primary text-xs',
          });
        },
        onSettled: () => {
          setUpdating(false);
          resetForm();
        },
      });
    },
    validate: (values) => {
      let errors = {};
      if (!values.amount) {
        errors.amount = 'لطفا مبلغ را وارد کنید';
      }
      return errors;
    },
  });

  return (
    <section className="p-section relative">
      <PreLoader pending={isUpdating} title={'در حال افزایش اعتبار'} />
      <PanelDetail headerTitle={'افزایش اعتبار'}>
        <div className="py-2 flex items-center justify-between flex-col md:flex-row gap-5">
          <SecondaryHeading>میزان اعتبار مورد نظر (به ریال وارد شود):</SecondaryHeading>

          <form className="flex  flex-col gap-5" onSubmit={handleSubmit}>
            {errors.amount && touched.amount && <span className="text-red-500 text-xs">{errors.amount}</span>}
            <div className="flex items-center flex-col lg:flex-row gap-5">
              <input
                type="number"
                className="w-64 py-2.5 rounded-md bg-[#f6f8fc] dark:text-white px-3"
                placeholder="0"
                name="amount"
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <button type="submit" className="bg-primary-1 text-white rounded-md px-5 py-2.5 text-sm font-bold w-full">
                افزایش اعتبار
              </button>
            </div>
          </form>
        </div>
      </PanelDetail>
    </section>
  );
}
