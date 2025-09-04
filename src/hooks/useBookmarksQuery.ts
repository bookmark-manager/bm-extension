import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { BookmarkFormValues } from '../types/bookmark-form-values';
import { createBookmark } from '../api/createBookmark';
import { checkBookmarkExistence } from '../api/checkBookmarkExistense';
import { deleteBookmark } from '../api/deleteBookmark';
import type { BookmarkStateType } from '../constants';

const notifyBackgroundScript = (type: BookmarkStateType) => {
  if (typeof chrome !== 'undefined' && chrome.runtime) {
    chrome.runtime.sendMessage(type);
  }
};

export const useCreateBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: BookmarkFormValues) => createBookmark(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['check-for-bookmark'] });
      notifyBackgroundScript('bookmark_created');
    },
  });
};

export const useCheckForBookmark = (url: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['check-for-bookmark'],
    queryFn: () => checkBookmarkExistence(url),
    enabled: !!url,
  });

  return {
    data: data?.data,
    ...rest,
  };
};

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBookmark(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['check-for-bookmark'] });
      notifyBackgroundScript('bookmark_deleted');
    },
  });
};
