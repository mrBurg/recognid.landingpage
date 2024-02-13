import { ChangeEventHandler, FocusEventHandler } from 'react';

export type TInputComponent = Record<'placeholder' | 'value', string> &
  Partial<
    Record<'id' | 'errorMessage' | 'className', string> &
      Record<'error' | 'required', boolean> &
      Record<'callBack', ChangeEventHandler<HTMLInputElement>> &
      Record<'onBlur', FocusEventHandler<HTMLInputElement>>
  >;
