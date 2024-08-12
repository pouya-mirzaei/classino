import PrimaryHeading from '../../components/panel/PrimaryHeading';
import Alert from '../../components/panel/Alert/Alert';
import { getAllCourses } from '../../functions/Utilities';
import { useCart } from '../../Contexts/CartContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const cart = useCart();
  const courses = cart.cartItems;
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.isEmpty()) {
      navigate('/panel/store');
    }
  }, []);

  return (
    <section className="p-section space-y-10">
      <PrimaryHeading>سبد خرید</PrimaryHeading>

      <div className="flex justify-evenly flex-col lg:flex-row gap-5">
        <div className="basis-2/3 space-y-7">
          {courses.map((course) => (
            <CoursePreview {...course} key={course.id} cart={cart} />
          ))}
        </div>
        <div className="basis-1/3">
          <Alert status="warning">
            <div className="flex items-center flex-col text-center gap-3">
              <span className="text-base font-bold">
                پرداخت شما به صورت یکجا میباشد در صورت تمایل میتوانید به صورت قسطی پرداخت کنید
              </span>
              <button className="h-12 px-5 item-link text-sm font-bold text-white rounded-3xl shadow-lg shadow-black/20">
                تغییر نحوه پرداخت به قسطی
              </button>
            </div>
          </Alert>
        </div>
      </div>
      <div></div>

      <Alert status="success" className="flex-wrap">
        <span className="basis-full mb-2 text-center md:basis-auto">قابل پرداخت از طریق درگاه:</span>
        <span className="">{cart.finalPrice().toLocaleString('fa-ir')} ریال</span>
        <button className="h-12 min-w-[80px] px-5 item-link text-sm text-white rounded-3xl shadow-lg shadow-black/20">
          تایید نهایی خرید
        </button>
      </Alert>
    </section>
  );
}

const CoursePreview = ({ id, price, name, image, cart }) => {
  return (
    <div className="bg-white dark:bg-dark-1 dark:text-white rounded-lg shadow-md shadow-black/10 px-5 py-2 flex flex-col md:flex-row items-center gap-10">
      {/* delete icon and image */}
      <div className="basis-1/4 w-full flex items-center md:justify-around justify-between flex-row-reverse md:flex-row">
        <span className="cursor-pointer" onClick={() => cart.removeFromCart(id)}>
          <svg className="text-red-600 w-8 h-8">
            <use href="/sprite/hero.svg#trash"></use>
          </svg>
        </span>
        <div className="w-[85px] h-[85px] overflow-hidden rounded-lg">
          <img src={image} alt={name} />
        </div>
      </div>

      {/* course details */}
      <div className="basis-2/3 self-start">
        <span className=" text-xs font-bold text-gray-400">نام دوره :</span>
        <div className="mb-5 text-sm font-bold">{name}</div>

        <div>
          <span className=" text-xs font-bold text-gray-400">کد محصول : </span>
          <span className="text-sm text-gray-700 dark:text-white">{id.toLocaleString('fa-ir')}</span>
        </div>
        <div>
          <span className=" text-xs font-bold text-gray-400">قیمت دوره : </span>
          <span className="text-sm text-gray-700 dark:text-white">{price.toLocaleString('fa-ir')} ریال</span>
        </div>
        <div>
          <span className=" text-xs font-bold text-gray-400">قیمت محاسبه شده : </span>
          <span className="text-sm text-gray-700 dark:text-white">{price.toLocaleString('fa-ir')} ریال</span>
        </div>
      </div>
    </div>
  );
};
