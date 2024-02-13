type TTabs = Record<'id' | 'name' | 'title' | 'image', string> &
  Record<'text', string[]>;

export type TTabsBlock = Record<'title' | 'buttonText', string> &
  Record<'tabs', TTabs[]>;
