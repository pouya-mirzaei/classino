import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '../../supabase/supabaseConfig';
import { useDebounce } from '../uesDebounce';
import useAuth from './useAuth';
import { useEnrollments } from './useEnrollments';

export default function useCourses({ title = '', category = '', teacher = '' } = {}) {
  const { userCourses, isUserCoursesFetching } = useEnrollments();
  const debounceTitle = useDebounce(title, 500);

  const {
    data: courses,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['courses', debounceTitle, category, teacher],
    queryFn: async () => {
      let query = supabase.from('courses').select().eq('is_purchasable', true);

      if (title) {
        query = query.ilike('title', `%${title}%`);
      }

      if (category) {
        query = query.eq('course_category_id', category);
      }

      if (teacher) {
        query = query.eq('teacher_id', teacher);
      }

      const { data, error } = await query;
      if (error) throw error;

      return data;
    },

    gcTime: 1000 * 60 * 1,
    staleTime: 1000 * 60 * 5,
    placeholderData: (p) => p,
  });

  return { courses, isFetching, isError };
}
