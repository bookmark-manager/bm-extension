import { useEffect, useState } from 'react';
import type { BookmarkFormValues } from './types/bookmark-form-values';
import classes from './App.module.css';
import { BookmarkForm } from './components/BookmarkForm';
import { useForm } from '@mantine/form';
import { useCheckForBookmark, useCreateBookmark } from './hooks/useBookmarksQuery';
import { AlreadyExists } from './components/AlreadyExists';

function App() {
  const [error, setError] = useState<Error>();

  const form = useForm<BookmarkFormValues>({
    initialValues: {
      title: '',
      url: '',
    },
  });

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (chrome?.runtime.lastError) {
          setError(new Error(chrome.runtime.lastError.message));
          return;
        }

        const currentTab = tabs[0];
        form.setValues({
          url: currentTab.url || '',
          title: currentTab.title || '',
        });
      });
    } else {
      setError(new Error('Chrome API is not available'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data: foundBookmark,
    isError: isCheckError,
    error: checkError,
  } = useCheckForBookmark(form.values.url);

  const {
    mutateAsync: createBookmark,
    isError: isCreateError,
    isSuccess,
    error: createError,
  } = useCreateBookmark();

  if (isCheckError) {
    setError(checkError);
  }
  if (isCreateError) {
    setError(createError);
  }

  if (isSuccess) {
    close();
  }

  return (
    <div className={classes.container}>
      {foundBookmark?.found ? (
        <AlreadyExists id={foundBookmark.id} />
      ) : (
        <BookmarkForm form={form} onSubmit={createBookmark} />
      )}

      {error && (
        <div className={classes.errorSection}>
          <b>Error: </b>
          {error.message}
        </div>
      )}
    </div>
  );
}

export default App;
