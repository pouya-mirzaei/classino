import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase/supabaseConfig';

export default function useAuth() {
  const queryClient = useQueryClient();

  const { data: user, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return null;

      const id = session.user.id;

      // console.log(error);
      const { data, error: Error } = await supabase.from('users').select().eq('id', id).single();

      if (Error) {
        //   return null;
        console.log(Error);
        throw Error;
      }

      return data;
    },
  });

  const loginWithProvider = async (provider) => {
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + '/login',
      },
    });
  };

  const signUpWithEmailAndPassword = useMutation({
    mutationFn: async ({ email, password, metaData = {} }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metaData,
        },
      });
      if (error) throw error;

      return data;
    },
  });

  const signOut = () => {
    supabase.auth.signOut();
    queryClient.invalidateQueries({ queryKey: ['user'] });
  };

  return {
    isFetching,
    user,
    loginWithProvider,
    signOut,
    signUpWithEmailAndPassword,
  };
}
