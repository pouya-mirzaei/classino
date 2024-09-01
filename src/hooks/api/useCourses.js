import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { supabase } from '../../supabase/supabaseConfig';
import { useDebounce } from '../uesDebounce';

export default function useCourses({ title = '', category = '' } = {}) {
  const debounceTitle = useDebounce(title, 500);

  const {
    data: courses,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['courses', debounceTitle, category],
    queryFn: async () => {
      let query = supabase.from('courses').select('*, teachers(*)').eq('is_purchasable', true);

      if (title) {
        query = query.ilike('title', `%${title}%`);
      }

      if (category) {
        query = query.eq('course_category_id', category);
      }

      const { data, error } = await query;
      if (error) throw error;

      return data;
    },

    gcTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });

  return { courses, isFetching, isError };
}
