import { useMutation, useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import { supabase } from '../../supabase/supabaseConfig';

export function useCart() {
  const { user } = useAuth();

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
    staleTime: 0,
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

  const contains = (courseId) => cart.some((course) => course.course_id === courseId);
  const isEmpty = () => cart?.length === 0;
  const totalPrice = () => cart?.reduce((sum, item) => sum + item.courses.price, 0) || 0;
  const taxToPay = (tax) => (tax * totalPrice()) / 100;
  const finalPrice = (tax) => totalPrice() + taxToPay(tax);
  const size = () => cart?.length || 0;
  return { cart, isFetching, addToCart, refetch, contains, isEmpty, totalPrice, taxToPay, finalPrice, removeFromCart, size };
}
