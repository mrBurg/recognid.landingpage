type TItem = Record<'title' | 'imageUrl' | 'alt' | 'description', string>;

export type TSolutions = Record<'title' | 'buttonTitle' | 'linkTo', string> &
  Record<'items', TItem[]>;
