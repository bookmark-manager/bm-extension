import type { BookmarkStateType } from './constants';
import { getCurrentTab } from './utils/get-current-tab';
import { updateExtensionIcon } from './utils/update-extension-icon';

chrome.tabs.onActivated.addListener(async activeInfo => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  await updateExtensionIcon(activeInfo.tabId, tab.url || '');
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading') {
    await updateExtensionIcon(tabId, tab.url || '');
  }
});

chrome.runtime.onMessage.addListener((message: BookmarkStateType) => {
  if (message === 'bookmark_created' || message === 'bookmark_deleted') {
    getCurrentTab().then(async tab => {
      if (tab && tab.id && tab.url) {
        await updateExtensionIcon(tab.id, tab.url);
      }
    });
  }
});
