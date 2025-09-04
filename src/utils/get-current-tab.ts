export const getCurrentTab = (): Promise<chrome.tabs.Tab> => {
  return new Promise((resolve, reject) => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (chrome?.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        }

        resolve(tabs[0]);
      });
    } else {
      reject(new Error('Chrome API is not available'));
    }
  });
};
