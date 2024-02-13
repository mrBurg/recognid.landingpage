export type TItem = Record<'alt' | 'src', string> &
  Partial<Record<'srcHov' | 'link', string>>;

export type TRecognition = Record<
  | 'title'
  | 'trustedTitle'
  | 'partnersTitle'
  | 'certificationsTitle'
  | 'mediaAboutUsTitle',
  string
> &
  Record<
    | 'trustedItems'
    | 'partnersItems'
    | 'certificationsItems'
    | 'mediaAboutUsItems',
    TItem[]
  >;
