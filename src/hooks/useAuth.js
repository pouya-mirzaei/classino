import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase/supabaseConfig';

export default function useAuth() {
  const queryClient = useQueryClient();

  const { data: user, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        return null;
      }
      return user;
    },
  });

  const loginWithProvider = async (provider) => {
    supabase.auth.signInWithOAuth({ provider });
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
    queryClient.setQueryData(['user'], null);
    supabase.auth.signOut();
  };

  return {
    isFetching,
    user,
    loginWithProvider,
    signOut,
    signUpWithEmailAndPassword,
  };
}
