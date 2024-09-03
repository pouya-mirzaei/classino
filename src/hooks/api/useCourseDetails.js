import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../supabase/supabaseConfig';
import { useEnrollments } from './useEnrollments';

const fetchCourseDetails = async (courseId) => {
  // Fetch course data
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('*, teacher:teachers(*), lessons(*)')
    .eq('course_id', courseId)
    .single();

  if (courseError) throw courseError;

  return course;
};

const useCourseDetails = (courseId) => {
  // Check if user is enrolled in the course
  const { userCourses: enrollments, isUserCoursesFetching } = useEnrollments();

  const isEnrolled = enrollments?.some((enrollment) => enrollment.courses.course_id === courseId);

  // Fetch course details if the user is enrolled
  const courseQuery = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => fetchCourseDetails(courseId),
    staleTime: 1000 * 60 * 1,
    retry: false,
  });

  return {
    isEnrolled,
    course: courseQuery.data,
    isLoading: courseQuery.isLoading && isUserCoursesFetching,
    error: courseQuery.error,
  };
};

export default useCourseDetails;
