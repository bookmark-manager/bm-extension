import type { FC } from 'react';
import { Button } from '../Button';
import { useDeleteBookmark } from '../../hooks/useBookmarksQuery';

interface AlreadyExistsProps {
  id: number;
}

export const AlreadyExists: FC<AlreadyExistsProps> = ({ id }) => {
  const { mutateAsync: deleteBookmark } = useDeleteBookmark();

  return (
    <div>
      <h3>Эта страница уже в ваших закладках</h3>
      <p>Нажмите "Удалить", чтобы убрать её из списка.</p>

      <Button onClick={() => deleteBookmark(id)}>Удалить из закладок</Button>
    </div>
  );
};
