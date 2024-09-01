import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '../../supabase/supabaseConfig';

export default function useCourses() {
  const {
    data: courses,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase.from('courses').select('*,teachers(*)');
      if (error) throw error;

      return data;
    },
  });

  return { courses, isFetching, isError };
}
