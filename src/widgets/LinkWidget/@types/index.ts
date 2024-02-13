import { LINK_TYPE } from './../../../constants';

export type TLinkWidget = Record<'href' | 'title', string> &
  Partial<
    Record<'className', string> &
      Record<'linkType', LINK_TYPE> &
      Record<'callBack', () => void>
  >;
