import { useMutation } from '@tanstack/react-query';
import { supabase } from '../supabase/supabaseConfig';

export const useStorage = () => {
  const uploadFile = useMutation({
    mutationFn: async ({ bucket, file }) => {
      if (!file) {
        throw new Error('No file selected');
      }

      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage.from(bucket).upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data; // or data.path, based on how you want to handle file info
    },
  });

  const getImagePublicUrl = async ({ bucket, filePath }) => {
    const { data, error } = await supabase.storage.from(bucket).getPublicUrl(filePath);

    if (error) {
      throw new Error(error.message);
    }

    return data.publicUrl;
  };

  const deleteFile = useMutation({
    mutationFn: async ({ bucket, filePath }) => {
      const data = await supabase.storage.from(bucket).remove([filePath]);
      console.log(data);
      console.log(bucket, filePath);

      if (data.error) {
        throw new Error(data.error.message);
      }

      return true;
    },
  });

  return {
    uploadFile,
    getImagePublicUrl,
    deleteFile,
  };
};
