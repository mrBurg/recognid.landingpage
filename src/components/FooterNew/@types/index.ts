export type TFooter = Record<'regognitionText' | 'mail', string> &
  Record<'policy', Record<'label' | 'url', string>> &
  Record<'contacts', Record<'title' | 'value', string>[]>;
