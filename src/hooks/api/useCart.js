import { useMutation, useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import { supabase } from '../../supabase/supabaseConfig';
import { useEffect, useState } from 'react';

export function useCart() {
  const { user } = useAuth();
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const {
    data: cart,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data, error } = await supabase.from('cart').select('*,courses(*),users(*)').eq('user_id', user.id);

      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 1,
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

    if (new Date(data.end_date).getTime() < currentDate) {
      throw new Error('کد تخفیف منقضی شده است');
    }

    setDiscount(data.discount_percentage);
  };

  const removeDiscount = () => {
    setDiscountCode('');
    setDiscount(0);
  };

  const contains = (courseId) => cart.some((course) => course.course_id === courseId);
  const isEmpty = () => cart?.length === 0;
  const totalPrice = () => cart?.reduce((sum, item) => sum + item.courses.price, 0) || 0;
  const discountAmount = () => (totalPrice() * discount) / 100;
  const discountedPrice = () => totalPrice() - discountAmount();
  const taxToPay = (tax) => (tax * totalPrice()) / 100;
  const finalPrice = (tax) => discountedPrice() + taxToPay(tax) - user.credit_balance;
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
  };
}
