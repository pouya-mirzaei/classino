import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase/supabaseConfig';
import { toast } from 'react-toastify';

export default function useAuth() {
  const queryClient = useQueryClient();

  const {
    data: user,
    isFetching,
    refetch: refetchUser,
  } = useQuery({
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
        console.log(Error);

        toast.error('خطا در بارگذاری اطلاعات کاربر', {
          className: 'font-primary text-xs',
        });
        throw Error;
      }

      return data;
    },
  });

  const loginWithProvider = async (provider) => {
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + '/auth/callback',
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

  const signInWithEmailAndPassword = useMutation({
    mutationFn: async ({ email, password }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return data;
    },
  });

  const updateUser = useMutation({
    mutationFn: async (updates) => {
      const { data, error } = await supabase.from('users').update(updates).eq('id', user?.id).single();

      if (error) throw error;

      return data;
    },
  });

  const changePassword = useMutation({
    mutationFn: async (newPassword) => {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      console.log(data);

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
    refetchUser,
    signInWithEmailAndPassword,
    updateUser,
    changePassword,
  };
}
