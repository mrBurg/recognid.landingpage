type TItem = Record<'title' | 'imageUrl' | 'description', string>;

export type TIndustries = Record<'title' | 'buttonText', string> &
  Record<'itemsList', TItem[]>;
