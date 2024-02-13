type TItem = Record<'title' | 'imageUrl' | 'alt', string> &
  Record<'innerList', Record<'text', string>[]>;

export type TSolutionsOLD = Record<'title' | 'buttonTitle' | 'linkTo', string> &
  Record<'items', TItem[]>;
