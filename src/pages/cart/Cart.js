import PrimaryHeading from '../../components/panel/PrimaryHeading';
import Alert from '../../components/panel/Alert/Alert';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckOut from '../../components/panel/Checkout/CheckOut';
import SecondaryHeading from '../../components/panel/SecondaryHeading';
import { useCart } from '../../hooks/api/useCart';
import PreLoader from '../../components/PreLoader';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/api/useAuth';

export default function Cart() {
  const {
    user: { credit_balance },
  } = useAuth();
  const cart = useCart();
  const [isUpdating, setUpdating] = useState(false);
  const navigate = useNavigate();

  const TAX = 10;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (cart.isEmpty()) {
      navigate('/panel/store');
    }
  }, []);

  const handleEnroll = () => {
    setUpdating(true);
    if (cart.isEmpty()) {
      toast.warning('سبد خرید خالی است', {
        className: 'font-primary text-xs',
      });
      setUpdating(false);
      return;
    }

    cart.enroll.mutate(cart.cart, {
      onSuccess: () => {
        toast.success('خرید شما با موفقیت انجام شد', {
          className: 'font-primary text-xs',
        });
        // navigate('/panel/mycourselist');
      },
      onError: (error) => {
        toast.error(error.message, {
          className: 'font-primary text-xs text-right',
        });
      },
      onSettled: () => {
        setUpdating(false);
      },
    });
  };

  return (
    <section className="p-section space-y-10">
      <PrimaryHeading>سبد خرید</PrimaryHeading>
      {/* cart items */}
      <div className="flex justify-evenly flex-col lg:flex-row gap-5">
        <div className="basis-2/3 space-y-7 relative">
          <PreLoader pending={cart.isFetching || isUpdating} title={'در حال بارگذاری...'} />
          {cart.cart?.map((course) => (
            <CoursePreview
              {...course.courses}
              key={course.courses.id}
              removeFromCart={cart.removeFromCart}
              handleUpdating={setUpdating}
            />
          ))}
        </div>
        <div className="basis-1/3">
          <Alert status="warning">
            <div className="flex items-center flex-col text-center gap-3">
              <span className="text-base font-bold">
                پرداخت شما به صورت یکجا میباشد در صورت تمایل میتوانید به صورت قسطی پرداخت کنید
              </span>
              <button className="h-12 px-5 item-link text-sm font-bold text-white rounded-3xl shadow-lg shadow-black/20 active:scale-95">
                تغییر نحوه پرداخت به قسطی
              </button>
            </div>
          </Alert>
        </div>
      </div>

      {/* checkout */}
      <div className="flex flex-col md:flex-row gap-10">
        <CheckOut isPending={isUpdating} cart={cart} />
        <DiscountBox cart={cart} isPending={isUpdating} handleUpdating={setUpdating} />
      </div>
      <Alert status="success" className="flex-wrap">
        <span className="basis-full mb-2 text-center md:basis-auto">قابل پرداخت از طریق درگاه:</span>
        <span className="">
          {(cart.finalPrice(TAX) - credit_balance < 0 ? '0' : cart.finalPrice(TAX) - credit_balance).toLocaleString('fa-ir')} ریال
        </span>
        <button
          className="h-12 min-w-[80px] px-5 item-link text-sm text-white rounded-3xl shadow-lg shadow-black/20 focus:scale-95 hover:scale-105"
          onClick={handleEnroll}
        >
          تایید نهایی خرید
        </button>
      </Alert>
    </section>
  );
}

const DiscountBox = ({ cart: { applyDiscount }, isPending, handleUpdating }) => {
  const [offInput, setOffInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!offInput) return;
    handleUpdating(true);
    try {
      await applyDiscount(offInput);

      toast.success('کد تخفیف با موفقیت اعمال شد', {
        className: 'font-primary text-xs',
      });
      setOffInput('');
    } catch (err) {
      toast.error(err.message, {
        className: 'font-primary text-xs',
      });
    }
    handleUpdating(false);
  };

  return (
    <div className="grow space-y-5">
      <PreLoader pending={isPending} title={'در حال اعتبارسنجی...'} />
      <SecondaryHeading>کد تخفیف</SecondaryHeading>
      <div className="bg-[#f6f8fc] dark:bg-dark-1 dark:text-white rounded-md shadow-md shadow-black/20 p-5">
        <p className="mb-7 font-bold">اگر کد تخفیفی دارید، اعمال کنید</p>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-5 md:gap-0 items-center mb-5">
          <input
            type="text"
            value={offInput}
            name="classino-discount"
            onChange={(e) => setOffInput(e.target.value)}
            className="h-10 md:w-72 w-full bg-white text-black pr-2 py-2 md:rounded-l-none rounded-lg shadow-lg shadow-black/30 text-xl"
          />
          <input
            type="submit"
            value="اعمال کد"
            className="h-10 bg-primary-1 w-full md:w-max text-white p-2 md:rounded-r-none rounded-lg  cursor-pointer text-xs shadow-lg shadow-black/30 hover:bg-primary-2 transition-all active:scale-95"
          />
        </form>
      </div>
    </div>
  );
};

const CoursePreview = ({ id, price, title, course_image_url, removeFromCart, course_id, handleUpdating }) => {
  const handleRemove = () => {
    handleUpdating(true);
    removeFromCart.mutate(
      { courseId: id },
      {
        onSuccess: () => {
          toast.success('دوره با موفقیت از سبد خرید حذف شد', {
            className: 'font-primary text-xs',
          });
        },

        onError: (error) => {
          toast.error(error.message, {
            className: 'font-primary text-xs',
          });
        },
        onSettled: () => {
          handleUpdating(false);
        },
      }
    );
  };

  return (
    <div className="bg-white dark:bg-dark-1 dark:text-white rounded-lg shadow-md shadow-black/10 px-5 py-2 flex flex-col md:flex-row items-center gap-10">
      {/* delete icon and image */}
      <div className="basis-1/4 w-full flex items-center md:justify-around justify-between flex-row-reverse md:flex-row">
        <span className="cursor-pointer" onClick={handleRemove}>
          <svg className="text-red-600 w-8 h-8">
            <use href="/sprite/hero.svg#trash"></use>
          </svg>
        </span>
        <div className="w-[85px] h-[85px] overflow-hidden rounded-lg">
          <img src={course_image_url} alt={title} />
        </div>
      </div>

      {/* course details */}
      <div className="basis-2/3 self-start">
        <span className="text-xs font-bold text-gray-400">نام دوره :</span>
        <div className="mb-5 text-sm font-bold">{title}</div>

        <div>
          <span className="text-xs font-bold text-gray-400">کد محصول : </span>
          <span className="text-sm text-gray-700 dark:text-white">{course_id}</span>
        </div>
        <div>
          <span className="text-xs font-bold text-gray-400">قیمت دوره : </span>
          <span className="text-sm text-gray-700 dark:text-white">{price.toLocaleString('fa-ir')} ریال</span>
        </div>
        <div>
          <span className="text-xs font-bold text-gray-400">قیمت محاسبه شده : </span>
          <span className="text-sm text-gray-700 dark:text-white">{price.toLocaleString('fa-ir')} ریال</span>
        </div>
      </div>
    </div>
  );
};
