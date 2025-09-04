import type { ErrorResponse, Response, ResponseFound } from '../types/response';
import { checkBookmarkExistenceApiUrl } from './urls';

export const checkBookmarkExistence = async (
  bookmarkUrl: string,
): Promise<Response<ResponseFound>> => {
  const url = checkBookmarkExistenceApiUrl();
  const params = url.searchParams;

  params.set('url', bookmarkUrl.toString());

  const resp = await fetch(url);

  if (!resp.ok) {
    const errData: ErrorResponse = await resp.json();
    throw new Error(errData.error || 'Failed to check bookmark existence');
  }

  return resp.json();
};
