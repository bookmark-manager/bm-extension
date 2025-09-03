import { useEffect, useState } from 'react';

function App() {
  const [pageInfo, setPageInfo] = useState({ url: '', title: '' });

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const currentTab = tabs[0];
        console.log(tabs);
        setPageInfo({
          url: currentTab.url || '',
          title: currentTab.title || '',
        });
      });
    }
  }, []);

  return (
    <div>
      <h2>{pageInfo.title}</h2>
      <p>
        <strong>URL:</strong> {pageInfo.url}
      </p>
    </div>
  );
}

export default App;
