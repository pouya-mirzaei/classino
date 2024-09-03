import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../supabase/supabaseConfig';
import useAuth from './useAuth';

export function useEnrollments() {
  const { user } = useAuth();

  const hasCourse = async (courseId) => {
    const { error } = await supabase.from('enrollments').select().eq('user_id', user.id).eq('course_id', courseId).single();

    if (error) {
      console.log(error);

      return false;
    }

    return true;
  };

  const {
    data: userCourses,
    isFetching: isUserCoursesFetching,
    isError,
  } = useQuery({
    queryKey: ['userCourses', user.id],
    queryFn: async () => {
      const { data, error } = await supabase.from('enrollments').select('courses(*)').eq('user_id', user.id);
      if (error) {
        throw error;
      }

      return data;
    },
  });

  return {
    hasCourse,
    userCourses,
    isUserCoursesFetching,
    isError,
  };
}
