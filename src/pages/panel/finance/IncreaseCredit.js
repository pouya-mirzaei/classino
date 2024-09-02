import React from 'react';

import PanelDetail from '../../../components/panel/PanelDetail/PanelDetail';
import SecondaryHeading from '../../../components/panel/SecondaryHeading';
import { useFormik } from 'formik';

export default function IncreaseCredit() {
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
    initialValues: {
      amount: '',
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
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
    <section className="p-section">
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
