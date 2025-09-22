import { getBookmarksApiUrl } from './urls';

export const deleteBookmark = async (id: number) => {
  const url = `${getBookmarksApiUrl()}/${id}`;

  const resp = await fetch(url, { method: 'DELETE' });

  if (!resp.ok) {
    const errData = await resp.json();
    throw new Error(errData.error || 'Failed to delete bookmark');
  }
};
