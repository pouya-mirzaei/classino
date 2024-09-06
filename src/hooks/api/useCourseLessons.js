import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../supabase/supabaseConfig';
import { useEnrollments } from './useEnrollments';

export function useCourseLessons(lessonId) {
  const { userCourses, isUserCoursesFetching } = useEnrollments();
  const fetchLessons = async (lessonId) => {
    const { data, error } = await supabase
      .from('lessons')
      .select('*,course:courses(*,teacher:teachers(*))')
      .eq('lesson_id', lessonId)
      .single();
    if (error) throw error;

    if (!isUserCoursesFetching) {
      if (userCourses.some((userCourse) => userCourse.courses.course_id === data.course.course_id)) return data;
      else throw new Error('شما به این کلاس دسترسی ندارید');
    }

    throw new Error('wait');
  };

  const {
    data: lesson,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['lessons', lessonId],
    queryFn: () => fetchLessons(lessonId),
    staleTime: 1000 * 60 * 10,
    retry: (failureCount, error) => {
      if (error.message === 'شما به این کلاس دسترسی ندارید') {
        return false;
      }
      if (error.message === 'wait') {
        return true; // Retry indefinitely until isUserCoursesFetching resolves
      }
      return false;
    },
  });

  return { lesson, isLoading: isFetching || isUserCoursesFetching, error };
}
