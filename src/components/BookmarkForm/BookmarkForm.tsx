import type { FC } from 'react';
import type { BookmarkFormValues } from '../../types/bookmark-form-values';
import { type UseFormReturnType } from '@mantine/form';
import { Input } from '../Input';
import classes from './BookmarkForm.module.css';
import { Button } from '../Button';

interface BookmarkForm {
  form: UseFormReturnType<BookmarkFormValues>;
  onSubmit: (values: BookmarkFormValues) => void;
}

export const BookmarkForm: FC<BookmarkForm> = ({ form, onSubmit }) => {
  return (
    <form onSubmit={form.onSubmit(onSubmit)} className={classes.container}>
      <h3>Bookmark-manager</h3>
      <Input label="Название" {...form.getInputProps('title')} />
      <Input label="URL" {...form.getInputProps('url')} />

      <div className={classes.controls}>
        <Button>Добавить</Button>
      </div>
    </form>
  );
};
