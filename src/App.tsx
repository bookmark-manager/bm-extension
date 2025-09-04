import { useEffect, useState } from 'react';
import type { BookmarkFormValues } from './types/bookmark-form-values';
import classes from './App.module.css';
import { BookmarkForm } from './components/BookmarkForm';
import { useForm } from '@mantine/form';
import { useCheckForBookmark, useCreateBookmark } from './hooks/useBookmarksQuery';
import { AlreadyExists } from './components/AlreadyExists';
import { getCurrentTab } from './utils/get-current-tab';

function App() {
  const [error, setError] = useState<Error>();

  const form = useForm<BookmarkFormValues>({
    initialValues: {
      title: '',
      url: '',
    },
  });

  useEffect(() => {
    getCurrentTab()
      .then(currentTab =>
        form.setValues({
          url: currentTab.url || '',
          title: currentTab.title || '',
        }),
      )
      .catch(err => setError(err));

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

  useEffect(() => {
    if (isCheckError) {
      setError(checkError);
    }
    if (isCreateError) {
      setError(createError);
    }
  }, [isCheckError, isCreateError, checkError, createError]);

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
