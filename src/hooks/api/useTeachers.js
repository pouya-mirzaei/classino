import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../supabase/supabaseConfig';

export function useTeachers() {
  const { data: teachers, isFetching: isTeachersFetching } = useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      const { data, error } = await supabase.from('teachers').select('*');

      if (error) throw error;

      return data;
    },
  });

  return { teachers, isTeachersFetching };
}
