import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from './useAuth';
import { supabase } from '../../supabase/supabaseConfig';
import { useEffect, useState } from 'react';

export function useCart() {
  const { user, updateCreditBalance } = useAuth();
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const queryClient = useQueryClient();

  const {
    data: cart,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data, error } = await supabase.from('cart').select('courses(*)').eq('user_id', user.id);

      if (error) throw error;
      return data;
    },
    staleTime: 0,
  });

  const enroll = useMutation({
    mutationKey: ['enroll'],
    mutationFn: async () => {
      const enrollmentCourses = [...cart].map((course) => ({ course_id: course.courses.id, user_id: user.id }));

      if (finalPrice(10) > user.credit_balance) {
        throw new Error('اعتبار شما کافی نیست. ابتدا اعتبار خود را افزایش دهید');
      }

      const { data, error } = await supabase.from('enrollments').insert(enrollmentCourses).select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      updateCreditBalance.mutate(finalPrice(10));
      clearCart.mutate();
      queryClient.invalidateQueries({ queryKey: ['userCourses', user.id] });
    },
  });

  const clearCart = useMutation({
    mutationKey: ['clearCart'],
    mutationFn: async () => {
      const { error } = await supabase.from('cart').delete().eq('user_id', user.id);
      if (error) throw error;

      return true;
    },
    onSettled: () => refetch(),
  });

  const addToCart = useMutation({
    mutationKey: ['addToCart'],
    mutationFn: async ({ courseId }) => {
      const { data, error } = await supabase.from('cart').insert({ user_id: user.id, course_id: courseId }).select();

      if (error) throw error;

      refetch();
      return data;
    },
  });

  const removeFromCart = useMutation({
    mutationKey: ['removeFromCart'],
    mutationFn: async ({ courseId }) => {
      const { error, data } = await supabase.from('cart').delete().eq('course_id', courseId).eq('user_id', user.id);
      if (error) throw error;

      return true;
    },
    onSettled: () => refetch(),
  });

  const applyDiscount = async (code) => {
    setDiscountCode(code);

    const { data, error } = await supabase.from('discounts').select('*').eq('code', code).eq('is_active', true).single();

    if (error) {
      throw new Error('کد تخفیف معتبر نمیباشد');
    }
    let currentDate = new Date().getTime();

    if (new Date(data.end_date).getTime() < currentDate || new Date(data.start_date).getTime() > currentDate) {
      throw new Error('کد فعال نمباشد');
    }

    setDiscount(data.discount_percentage);
  };

  const removeDiscount = () => {
    setDiscountCode('');
    setDiscount(0);
  };

  const contains = (courseId) => cart.some((course) => course.courses.id === courseId);
  const isEmpty = () => cart?.length === 0;
  const totalPrice = () => cart?.reduce((sum, item) => sum + item.courses.price, 0) || 0;
  const discountAmount = (tax) => ((totalPrice() + taxToPay(tax)) * discount) / 100;
  const taxToPay = (tax) => (tax * totalPrice()) / 100;
  const finalPrice = (tax) => totalPrice() + taxToPay(tax) - discountAmount(tax);

  const size = () => cart?.length || 0;

  return {
    cart,
    isFetching,
    addToCart,
    refetch,
    contains,
    isEmpty,
    totalPrice,
    taxToPay,
    finalPrice,
    removeFromCart,
    size,
    applyDiscount,
    discountCode,
    discount,
    discountAmount,
    removeDiscount,
    enroll,
  };
}
