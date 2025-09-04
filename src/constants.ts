export const BookmarkState = {
  CREATED: 'bookmark_created',
  DELETED: 'bookmark_deleted',
} as const;

export type BookmarkStateType = (typeof BookmarkState)[keyof typeof BookmarkState];

export const IconState = {
  INACTIVE: 'inactive',
  ACTIVE: 'active',
} as const;

export type IconStateType = (typeof IconState)[keyof typeof IconState];

export const iconPaths = {
  [IconState.ACTIVE]: {
    16: 'icons/active-16.png',
    32: 'icons/active-32.png',
    48: 'icons/active-48.png',
    128: 'icons/active-128.png',
  },

  [IconState.INACTIVE]: {
    16: 'icons/inactive-16.png',
    32: 'icons/inactive-32.png',
    48: 'icons/inactive-48.png',
    128: 'icons/inactive-128.png',
  },
};
