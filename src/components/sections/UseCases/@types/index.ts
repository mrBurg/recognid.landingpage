type TItem = Record<'title' | 'imageUrl' | 'alt' | 'footnote', string> &
  Record<'innerList', Record<'text', string>[]>;

export type TUseCases = Record<'title', string> & Record<'items', TItem[]>;
