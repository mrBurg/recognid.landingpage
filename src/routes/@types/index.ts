export type TRouter = Record<'href' | 'title', string> &
  Partial<
    Record<'alias', string> &
      Record<'button', boolean> &
      Record<'index', number>
  >;
