import { ChangeEventHandler } from 'react';

export type TTextFiledComponent = Record<'placeholder' | 'value', string> &
  Record<'callBack', ChangeEventHandler<HTMLTextAreaElement>> &
  Partial<
    Record<'error' | 'required', boolean> &
      Record<'id' | 'className', string> &
      Record<'onBlur', ChangeEventHandler<HTMLTextAreaElement>>
  >;
