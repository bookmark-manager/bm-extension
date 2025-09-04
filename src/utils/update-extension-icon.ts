import { checkBookmarkExistence } from '../api/checkBookmarkExistense';
import { iconPaths, IconState } from '../constants';

export const updateExtensionIcon = async (tabId: number, url: string) => {
  const {
    data: { found },
  } = await checkBookmarkExistence(url);
  const state = found ? IconState.ACTIVE : IconState.INACTIVE;

  chrome.action.setIcon({
    tabId,
    path: iconPaths[state],
  });
};
