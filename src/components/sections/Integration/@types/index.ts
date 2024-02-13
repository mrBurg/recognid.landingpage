type TItem = Record<'title' | 'descriptiom' | 'imageUrl', string>;

export type TIntegration = Record<'title' | 'mainImageUrl', string> &
  Record<'items', TItem[]>;
