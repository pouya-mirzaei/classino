import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../supabase/supabaseConfig';

export function useCourseCategories() {
  const { data: courseCategories, isLoading } = useQuery({
    queryKey: ['courseCategories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('course_categories').select('*');

      if (error) throw error;

      return data;
    },
  });

  return { courseCategories, isLoading };
}
