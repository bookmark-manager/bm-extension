import type { BookmarkFormValues } from '../types/bookmark-form-values';
import { getBookmarksApiUrl } from './urls';

export const createBookmark = async (payload: BookmarkFormValues) => {
  const resp = await fetch(getBookmarksApiUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    const errData = await resp.json();
    throw new Error(errData.error || 'Failed to create bookmark');
  }

  return resp.json();
};
