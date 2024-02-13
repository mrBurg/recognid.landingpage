import { ChangeEventHandler, FocusEventHandler } from 'react';

export type TCheckBoxComponent = Record<'text', string> &
  Record<'checked', boolean> &
  Partial<
    Record<'errorText', string> &
      Record<'error' | 'required' | 'invalid', boolean> &
      Record<'callBack', ChangeEventHandler<HTMLInputElement>> &
      Record<'onBlur', FocusEventHandler<HTMLInputElement>>
  >;
